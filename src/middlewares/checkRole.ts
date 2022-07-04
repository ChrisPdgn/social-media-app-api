import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "..";

import { User } from "../entity/user";

export const checkRole = (roles: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    //Get the user ID from previous midleware
    const id = res.locals.jwtPayload.userId;

    //Get user role from the database
    const userRepository = AppDataSource.getRepository(User);
    let user;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (id) {
      res.status(401).send();
    }

    if(user!= null){
      //Check if array of authorized roles includes the user's role
      if (roles.indexOf(user.role) > -1) next();
      else res.status(401).send();
    }
  };
};