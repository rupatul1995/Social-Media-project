import { Router } from 'express';
import { GetAllPosts, CreateNewPost } from '../controllers/post.controller.js';

const router = Router();

router.post('/create-post', CreateNewPost);
router.get('/all', GetAllPosts);

export default router;

