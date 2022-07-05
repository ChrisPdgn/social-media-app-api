import { Request, Response } from "express";
import { validate } from "class-validator";
import { AppDataSource } from "../index";
import { Post } from "../entity/post";
import { User } from "../entity/user";

class PostController {

    //create post
    static newPost = async (req: Request, res: Response) => {
        let { content , userId} = req.body;
        let post = new Post();

        const userRepository = AppDataSource.getRepository(User);
        const postRepository = AppDataSource.getRepository(Post);
        let user;
        try {
            user = await userRepository.findOneByOrFail({id: userId})
            .then((user) => { 
                post.content = content;
                post.user = user; 
            });
        } catch (error) {
            res.status(404).send("User not found");
        }

        //Validade if the parameters are ok
        const errors = await validate(post);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        try {
            await postRepository.save(post);
        } catch (error) {
            console.log("Post not created");
            return;
        }
        res.status(201).send("Post created");
    };

    //edit post
    static editPost = async (req: Request, res: Response) => {
        let id;
        try{
            id = parseInt(req.params.id);
        }catch(error){
            res.status(400).send("Id not a valid int");
        }

        //Get values from the body
        const content = req.body.content;

        const postRepository = AppDataSource.getRepository(Post);
        let post;
        try {
            post = await postRepository.findOneByOrFail({postId: id});
        } catch (error) {
            res.status(404).send("Post not found");
            return;
        }

        //Validate the new values on model
        post.content = content;
        
        const errors = await validate(post);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        try {
            await postRepository.save(post);
        } catch (e) {
            console.log("Post not updated");
            return;
        }

        res.status(204).send("Post updated");
    };

    //delete post
    static deletePost = async (req: Request, res: Response) => {
        let id;
        try{
            id = parseInt(req.params.id);
        }catch(error){
            res.status(400).send("Id not a valid int");
            return;
        }

        const postRepository = AppDataSource.getRepository(Post);
        try {
            await postRepository.findOneByOrFail({postId: id}).then((post) => {postRepository.remove(post);});
        } catch (error) {
            res.status(404).send("Post not found");
            return;
        }
        res.status(204).send();
    }; 

    //get my posts or get another user's post
    static getUserPosts = async (req: Request, res: Response) => {
        let email = req.params.email;
        const userRepository = AppDataSource.getRepository(User);
        try {
            const user = await userRepository.findOneByOrFail({email: email})
            .then((user) => { res.send({posts: user.posts}); });
        } catch (error) {
            res.status(404).send("User/Posts not found");
        }
    };


    //get all posts chronologically ordered
    static getAllPosts = async (req: Request, res: Response) => {
        const postRepository = AppDataSource.getRepository(Post);
        try {
            const posts = await postRepository.find()
            .then((posts) => { 
                const sortedPosts = posts.sort((objA, objB) => objB.date.getTime() - objA.date.getTime(),);
                res.send({sortedPosts}); });
        } catch (error) {
            res.status(404).send("Posts not found");
        }
    };

}

export default PostController;