import { Router } from 'express';
import CreatePost from '../../frontend2/src/component/CreatePost';
import isAuthenticated from '../Middlewares/isAutheticated';
import upload from '../Middlewares/multer';
import { addNewPost, dislikePost, getAllPost, getUserPost, likePost } from '../Controllers/post.controller';
const router = Router();

router.post('/New-Posts', createPost);
// router.post("/addpost" ,isAuthenticated, upload.single('image'), addNewPost);
router.get("/all", isAuthenticated,getAllPost);
router.get("/userpost/all" ,isAuthenticated, getUserPost);
// router.get("/:id/like" ,isAuthenticated, likePost);
// router.get("/:id/dislike", isAuthenticated, dislikePost);
export default router;