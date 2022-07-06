import { Request, Response } from "express";
import { validate } from "class-validator";
import { AppDataSource } from "../index";
import { Comment } from "../entity/comment";
import { User } from "../entity/user";
import { Post } from "../entity/post";

class CommentController {

    //create comment
    static newComment = async (req: Request, res: Response) => {

        const userRepository = AppDataSource.getRepository(User);
        const postRepository = AppDataSource.getRepository(Post);
        const commRepository = AppDataSource.getRepository(Comment);
        let { content, userId, postId } = req.body;
        let comment = new Comment();
        let user, post;

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

        const {userId, content} = req.body;
        const commRepository = AppDataSource.getRepository(Comment);
        let commentId, comment, findComment;

        try{
            commentId = parseInt(req.body.commentId);
        }catch(error){
            res.status(400).send("Id not a valid int");
        }

        try {
            findComment = await commRepository.find({
                relations: {
                    user: true
                },
                where:{
                    commentId: commentId,
                    user: {
                        id: userId
                    }
                }});
            console.log(findComment);

            if(findComment == null){
                res.status(401).send("Unauthorized");
                return;
            }else{
                //find comment again because the one above is joined with user and not identical with obj Comment
                comment = await commRepository.findOneByOrFail({commentId: commentId});
                comment.content = content;
            }
        } catch (error) {
            res.status(404).send("Comment not found");
            return;
        }

        //Validate the new values on model     
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

        const commRepository = AppDataSource.getRepository(Comment);
        const userId = req.body.userId;
        let commentId, comment, findComment;

        try{
            commentId = parseInt(req.body.commentId);
        }catch(error){
            res.status(400).send("Id not a valid int");
            return;
        }

        try {
            findComment = await commRepository.find({
                relations: {
                    user: true
                },
                where:{
                    commentId: commentId,
                    user: {
                        id: userId
                    }
                }});
            console.log(findComment);

            if(findComment == null){
                res.status(401).send("Unauthorized");
                return;
            }else{
                //find comment again because the one above is joined with user and not identical with obj Comment
                comment = await commRepository.findOneByOrFail({commentId: commentId});
                await commRepository.remove(comment);
            }
        } catch (error) {
            res.status(404).send("Comment not found");
            return;
        }
        res.status(204).send("Comment deleted");
    }; 

    //get comments of a post
    static getPostComments = async (req: Request, res: Response) => {

        const postRepository = AppDataSource.getRepository(Post);
        let postId;

        try{
            postId = parseInt(req.body.postId);
        }catch{
            res.status(400).send("Id not a valid int");
            return;
        }

        try {
            const post = await postRepository.findOneByOrFail({postId: postId})
            .then((post) => { res.send({comments: post.comments}); });
        } catch (error) {
            res.status(404).send("Post/Comments not found");
        }
    };

}

export default CommentController;