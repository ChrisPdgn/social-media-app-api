import { Request, Response } from "express";
import { validate } from "class-validator";
import { AppDataSource } from "../index";
import { Comment } from "../entity/comment";
import { User } from "../entity/user";
import { Post } from "../entity/post";

class CommentController {

    //create comment
    static newComment = async (req: Request, res: Response) => {
        let { content, userId, postId } = req.body;
        let comment = new Comment();
        
        const userRepository = AppDataSource.getRepository(User);
        const postRepository = AppDataSource.getRepository(Post);
        const commRepository = AppDataSource.getRepository(Comment);
        let user;
        let post;

        try{
            user = await userRepository.findOneByOrFail({id: userId});
            post = await postRepository.findOneByOrFail({postId: postId})
            comment.content = content;
            comment.user = user;
            comment.post = post;
        }catch (error){
            res.status(404).send("User/Post not found");
        }

        //Validade if the parameters are ok
        const errors = await validate(comment);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        try {
            await commRepository.save(comment);
        } catch (error) {
            console.log("Comment not created");
            return;
        }
        res.status(201).send("Comment created");
    };

    //edit comment
    static editComment = async (req: Request, res: Response) => {
        let id;
        try{
            id = parseInt(req.params.id);
        }catch(error){
            res.status(400).send("Id not a valid int");
        }

        //Get values from the body
        const content = req.body.content;

        const commRepository = AppDataSource.getRepository(Comment);
        let comment;
        try {
            comment = await commRepository.findOneByOrFail({commentId: id});
        } catch (error) {
            res.status(404).send("Comment not found");
            return;
        }

        //Validate the new values on model
        comment.content = content;
        
        const errors = await validate(comment);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        try {
            await commRepository.save(comment);
        } catch (e) {
            console.log("Comment not updated");
            return;
        }

        res.status(204).send("Comment updated");
    };

    //delete comment
    static deleteComment = async (req: Request, res: Response) => {
        let id;
        try{
            id = parseInt(req.params.id);
        }catch(error){
            res.status(400).send("Id not a valid int");
            return;
        }

        const commRepository = AppDataSource.getRepository(Comment);
        try {
            await commRepository.findOneByOrFail({commentId: id}).then((comment) => {commRepository.remove(comment);});
        } catch (error) {
            res.status(404).send("Comment not found");
            return;
        }
        res.status(204).send("Comment deleted");
    }; 

    //get comments of a post
    static getPostComments = async (req: Request, res: Response) => {
        let postId;
        try{
            postId = parseInt(req.params.postId);
        }catch{
            res.status(400).send("Id not a valid int");
            return;
        }

        const postRepository = AppDataSource.getRepository(Post);
        try {
            const post = await postRepository.findOneByOrFail({postId: postId})
            .then((post) => { res.send({comments: post.comments}); });
        } catch (error) {
            res.status(404).send("Post/Comments not found");
        }
    };

}

export default CommentController;