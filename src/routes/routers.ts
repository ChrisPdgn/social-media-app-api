
import express from 'express';
import UserController from '../controllers/users';
import PostController from '../controllers/posts';
import CommController from '../controllers/comments';

const router = express.Router();

router.post('/user', UserController.createUser);
router.get('/user/:username', UserController.getUser);

//to do

export = router;