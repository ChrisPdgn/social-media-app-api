import { Request, Response } from "express";
import jwt from "jsonwebtoken";
//import { validate } from "class-validator";
import { AppDataSource } from "../index";
import { User } from "../entity/user";
import config from "../config/config";

class AuthController {

  static login = async (req: Request, res: Response) => {

    const userRepository = AppDataSource.getRepository(User);

    //Check if username and password are set
    let { email, password } = req.body;
    if (!(email && password)) 
      res.status(400).send();

    try {
      await userRepository.findOneByOrFail({email: email})
      .then((user) => {
        if(!user.checkIfUnencryptedPasswordIsValid(password)){
          res.status(401).send();
          return;
        }else {
          //Sing JWT, valid for 1 hour
          const token = jwt.sign({ userId: user.id, email: user.email }, config.jwtSecret, { expiresIn: "1h" });
          //Send the jwt in the response
          console.log("Sending token");
          res.send(token);
        }});
    } catch (error) {
        res.status(401).send();
        return;
    }

  };

  // static changePassword = async (req: Request, res: Response) => {
  //   //Get ID from JWT
  //   const id = res.locals.jwtPayload.userId;

  //   //Get parameters from the body
  //   const { oldPassword, newPassword } = req.body;
  //   if (!(oldPassword && newPassword)) 
  //     res.status(400).send();

  //   const userRepository = AppDataSource.getRepository(User);
  //   try {
  //     await userRepository.findOneByOrFail(id)
  //     .then((user) =>{
  //       if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
  //         res.status(401).send();
  //         return;
  //       }else{
  //         //Validate the model (password lenght)
  //         user.password = newPassword;
  //         const errors = await validate(user);
  //         if (errors.length > 0) {
  //           res.status(400).send(errors);
  //           return;
  //         }

  //         //Hash the new password and save
  //         user.hashPassword();
  //         userRepository.save(user);

  //         res.status(204).send();
  //       }
  //     });
  //   } catch (id) {
  //     res.status(401).send();
  //   }

  // };

}

export default AuthController;