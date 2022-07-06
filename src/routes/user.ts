import { Router } from "express";
import UserController from "../controllers/UserController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

//Get all users
router.get("/users", [checkJwt, checkRole(["ADMIN"])], UserController.getAllUsers);

// Get one user
router.get("/user", [checkJwt], UserController.getUserByEmail);

//Create a new user
router.post("/user", [checkJwt, checkRole(["ADMIN"])], UserController.newUser);

//Edit one user
// router.patch("/:id([0-9]+)", [checkJwt, checkRole(["ADMIN"])],UserController.editUser);

//Delete one user
router.delete("/user", [checkJwt, checkRole(["ADMIN"])],UserController.deleteUser);

export default router;