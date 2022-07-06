import { Router } from "express";
import CommentController from "../controllers/CommentController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

//create comment
router.post("/comment", [checkJwt], CommentController.newComment);

//edit comment
router.patch("/comment", [checkJwt], CommentController.editComment);

//delete comment
router.delete("/comment", [checkJwt], CommentController.deleteComment);

//get comments of a post
router.get("/comments", [checkJwt], CommentController.getPostComments);

export default router;