import { Request, Response } from "express";
import { validate } from "class-validator";
import { AppDataSource } from "../index";
import { Post } from "../entity/post";
import { User } from "../entity/user";

class PostController {

    //create post
    static newPost = async (req: Request, res: Response) => {

        const userRepository = AppDataSource.getRepository(User);
        const postRepository = AppDataSource.getRepository(Post);
        let { content , userId } = req.body;
        let post = new Post();
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

        const content = req.body.content;
        const userId = req.body.userId;
        const postRepository = AppDataSource.getRepository(Post);
        let postId, post, findPost;

        try{
            postId = parseInt(req.body.postId);
        }catch(error){
            res.status(400).send("Id not a valid int");
        }

        try {
            findPost = await postRepository.find({
                relations: {
                    user: true
                },
                where:{
                    postId: postId,
                    user: {
                        id: userId
                    }
                }
            });
            console.log(findPost);

            if(findPost == null){
                res.status(401).send("Unauthorized");
                return;
            }else{
                //find post again because the one above is joined with user and not identical with obj Post
                post = await postRepository.findOneByOrFail({postId: postId});
                post.content = content;
            }
        } catch (error) {
            res.status(404).send("Post not found");
            return;
        }

        //Validate the new values on model
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

        const userId = req.body.userId;
        const postRepository = AppDataSource.getRepository(Post);
        let postId, post, findPost;

        try{
            postId = parseInt(req.body.postId);
        }catch(error){
            res.status(400).send("Id not a valid int");
            return;
        }

        try {
            findPost = await postRepository.find({
                relations: {
                    user: true
                },
                where:{
                    postId: postId,
                    user: {
                        id: userId
                    }
                }});
            console.log(findPost);

            if(findPost == null){
                res.status(401).send("Unauthorized");
                return;
            }else{
                //find post again because the one above is joined with user and not identical with obj Post
                await postRepository.findOneByOrFail({postId: postId}).then((post)=>{
                    postRepository.remove(post);
                });
            }
        } catch (error) {
            console.log(error);
            res.status(404).send("Post not found");
            return;
        }
        res.status(204).send();
    }; 

    //get my posts or get another user's post
    static getUserPosts = async (req: Request, res: Response) => {

        const email = req.body.email;
        const postRepository = AppDataSource.getRepository(Post);

        try {
            const posts = await postRepository.find({
                // select: ["postId", "content", "date", "comments"],
                relations: {
                    user: true,
                    comments: true
                },
                where:{
                    user: {
                        email: email
                    }
                }}).then((posts)=> {
                //I use map to remove sensitive data of user since select won't work for some reason
                res.status(200).send(posts.map(({user, ...rest})=> {return rest;}));
            });
        } catch (error) {
            console.log(error);
            res.status(404).send("User/Posts not found");
        }
    };


    //get all posts chronologically ordered
    static getAllPosts = async (req: Request, res: Response) => {

        const postRepository = AppDataSource.getRepository(Post);
        let filteredPosts;

        try {
            const posts = await postRepository.find({
                relations: {
                    user: true,
                    comments: true
                }
            })
            .then((posts) => { 
                //I use map to remove sensitive data of user since select won't work for some reason
                filteredPosts = posts.map(({user, ...rest})=> {return rest;});
                const sortedPosts = filteredPosts.sort((objA, objB) => objB.date.getTime() - objA.date.getTime(),);
                res.send({sortedPosts}); 
            });
        } catch (error) {
            res.status(404).send("Posts not found");
        }
        
    };

}

export default PostController;