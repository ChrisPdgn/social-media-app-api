import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "..";

import { User } from "../entity/user";

export const checkRole = (roles: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    //Get the user ID from previous middleware
    const id = res.locals.jwtPayload.userId;

    //Get user role from the database
    const userRepository = AppDataSource.getRepository(User);

    try {
      await userRepository.findOneByOrFail(id).then((user) => {
        if (roles.indexOf(user.role) > -1) next();
        else res.status(401).send();
      });
    } catch (id) {
      console.log("Unauthorized");
      res.status(401).send();
    }

  };
};