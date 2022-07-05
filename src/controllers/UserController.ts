import { Request, Response } from "express";
import { validate } from "class-validator";
import { AppDataSource } from "../index";
import { User } from "../entity/user";


class UserController {

    static getAllUsers = async (req: Request, res: Response) => {
        console.log("Get All")
        const userRepository = AppDataSource.getRepository(User);
        const users = await userRepository.find({
            select: ["email", "role"] //We dont want to send the passwords on response
        });
        res.send(users);
    };

    static getUserByEmail = async (req: Request, res: Response) => {
        let email = req.params.email;
        console.log(email);

        const userRepository = AppDataSource.getRepository(User);
        try {
            const user = await userRepository.findOneByOrFail({email: email})
            .then((user) => { res.send({"email": user.email , "role": user.role}); }); //We dont want to send the passwords on response
        } catch (error) {
            res.status(404).send("User not found");
        }
    };

    static newUser = async (req: Request, res: Response) => {
        let { id, email, password, role } = req.body;
        let user = new User();
        user.id = id;
        user.email = email;
        user.password = password;
        user.role = role;

        //Validade if the parameters are ok
        const errors = await validate(user);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        //Hash the password, to securely store on DB
        user.hashPassword();

        const userRepository = AppDataSource.getRepository(User);
        try {
            await userRepository.save(user);
        } catch (error) {
            res.status(409).send("Email already in use");
            return;
        }
        res.status(201).send("User created");
    };

    // static editUser = async (req: Request, res: Response) => {
    //     const email = req.params.email;
    //     const { role } = req.body;
    //     const userRepository = AppDataSource.getRepository(User);
    //     let user;
    //     try {
    //         user = await userRepository.findOneByOrFail({email: email});
    //     } catch (error) {
    //         res.status(404).send("User not found");
    //         return;
    //     }

    //     //Validate the new values on model
    //     user.email = email;
    //     user.role = role;
    //     const errors = await validate(user);
    //     if (errors.length > 0) {
    //         res.status(400).send(errors);
    //         return;
    //     }

    //     try {
    //         await userRepository.save(user);
    //     } catch (e) {
    //         res.status(409).send("Username already in use");
    //         return;
    //     }
    //     //After all send a 204 (no content, but accepted) response
    //     res.status(204).send();
    // };

    static deleteUser = async (req: Request, res: Response) => {
        const email = req.params.email;
        console.log("Delete");

        const userRepository = AppDataSource.getRepository(User);
        try {
            await userRepository.findOneByOrFail({email: email}).then((user) => {userRepository.remove(user);});
            // await userRepository.remove(user);
        } catch (error) {
            res.status(404).send("User not found");
            return;
        }
        res.status(204).send();
    };
};

export default UserController;