import { Router } from "express";
import CommentController from "../controllers/CommentController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

//create comment
router.post("/:userId&:postId&:content", [checkJwt, checkRole(["ADMIN"])], CommentController.newComment);

//edit comment
router.patch("/:commId", [checkJwt, checkRole(["ADMIN"])], CommentController.editComment);

//delete comment
router.delete("/:commId", [checkJwt, checkRole(["ADMIN"])], CommentController.deleteComment);

//get comments of a post
router.get("/:postId", [checkJwt, checkRole(["ADMIN"])], CommentController.getPostComments);

export default router;