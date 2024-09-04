import { Router } from 'express';
import { GetAllPosts, CreateNewPost, GetLatestPosts, LikePost } from '../Controllers/post.controller.js';

const router = Router();

router.post('/create-post', CreateNewPost);
router.get('/all', GetAllPosts);
router.get('/latest-posts', GetLatestPosts);

router.post('/like', LikePost);

export default router;

