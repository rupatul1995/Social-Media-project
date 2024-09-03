import { Router } from 'express';
import { GetAllPosts, CreateNewPost, getUserProfile } from '../Controllers/post.controller.js';

const router = Router();

router.post('/create-post', CreateNewPost);
router.get('/all', GetAllPosts);
router.get('/profile', getUserProfile);

export default router;

