import { Router } from "express";
import PostController from "../controllers/PostController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

//create post
router.post("/post", [checkJwt], PostController.newPost);

//edit post
router.patch("/post", [checkJwt], PostController.editPost);

//delete post
router.delete("/post", [checkJwt],PostController.deletePost);

//get my posts or user's posts
router.get("/post", [checkJwt], PostController.getUserPosts);

//get all posts chronologically ordered
router.get("/posts", [checkJwt], PostController.getAllPosts);

export default router;