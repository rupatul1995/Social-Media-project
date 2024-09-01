import { Router } from 'express';
import isAuthenticated from '../Middlewares/isAutheticated.js';
import { addComment, addNewPost, deletePost, dislikePost, getAllPost, getCommentsOfPost, getUserPost, likePost } from '../Controllers/post.controller.js';
import upload from '../Middlewares/multer.js';
const router = Router();

router.route("/addpost").post(isAuthenticated, upload.single('image'), addNewPost);
router.route("/all").get(isAuthenticated,getAllPost);
router.route("/userpost/all").get(isAuthenticated, getUserPost);
router.route("/:id/like").get(isAuthenticated, likePost);
router.route("/:id/dislike").get(isAuthenticated, dislikePost);
router.route("/:id/comment").post(isAuthenticated, addComment); 
router.route("/:id/comment/all").post(isAuthenticated, getCommentsOfPost);
router.route("/delete/:id").delete(isAuthenticated, deletePost);

export default router;