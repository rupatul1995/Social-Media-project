import { Router } from "express";
import { GetAllUsers, getCurrentUser,    Getsearch,    getUserPosts,    Login, Logout, Register} from "../Controllers/auth.controller.js";
import isAuthenticated from "../Middlewares/isAutheticated.js";

const router = Router();

router.post("/register", Register);
router.post("/login", Login);
router.get('/get-current-user', getCurrentUser);
router.post("/logout", Logout);
router.post('/user-posts', isAuthenticated, getUserPosts);
router.get('/allusers', GetAllUsers);
router.get('/search', Getsearch);

export default router;