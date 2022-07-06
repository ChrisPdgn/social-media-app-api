import { Request, Response } from "express";
import { validate } from "class-validator";
import { AppDataSource } from "../index";
import { User } from "../entity/user";


class UserController {

    static getAllUsers = async (req: Request, res: Response) => {

        const userRepository = AppDataSource.getRepository(User);

        //Select used to protect sensitive user data
        const users = await userRepository.find({ select: ["email", "role"] });
        res.send(users);
    };

    static getUserByEmail = async (req: Request, res: Response) => {

        const userRepository = AppDataSource.getRepository(User);
        let email = req.body.email;

        try {
            //Select used to protect sensitive user data
            const user = await userRepository.findOneByOrFail({email: email})
            .then((user) => { res.send({"email": user.email , "role": user.role}); }); 
        } catch (error) {
            res.status(404).send("User not found");
        }
    };

    static newUser = async (req: Request, res: Response) => {

        const userRepository = AppDataSource.getRepository(User);
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

        try {
            await userRepository.save(user);
        } catch (error) {
            res.status(409).send("Email already in use");
            return;
        }
        res.status(201).send("User created");
    };

    static deleteUser = async (req: Request, res: Response) => {

        const email = req.body.email;
        const userRepository = AppDataSource.getRepository(User);

        try {
            await userRepository.findOneByOrFail({email: email}).then((user) => {userRepository.remove(user);});
        } catch (error) {
            res.status(404).send("User not found");
            return;
        }
        res.status(204).send("User deleted");
    };
};

export default UserController;