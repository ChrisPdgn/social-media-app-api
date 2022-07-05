import { Router } from "express";
import PostController from "../controllers/PostController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

//create post
router.post("/:userId&:content", [checkJwt, checkRole(["ADMIN"])], PostController.newPost);

//edit post
router.patch("/:postId", [checkJwt, checkRole(["ADMIN"])], PostController.editPost);

//delete post
router.delete("/:postId", [checkJwt, checkRole(["ADMIN"])],PostController.deletePost);

//get my posts or user's posts
router.get("/:email", [checkJwt, checkRole(["ADMIN"])], PostController.getUserPosts);

//get all posts chronologically ordered
router.get("/", [checkJwt, checkRole(["ADMIN"])], PostController.getAllPosts);

export default router;