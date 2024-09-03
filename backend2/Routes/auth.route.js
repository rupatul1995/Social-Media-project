import { Router } from "express";
import { getAllUsers, getCurrentUser,  getSuggestedUsers,  getUserProfile,  Login, Logout, Register} from "../Controllers/auth.controller.js";

const router = Router();

router.post("/register", Register);
router.post("/login", Login);
router.get('/get-current-user', getCurrentUser);
router.post("/logout", Logout);
router.get('/profile', getUserProfile);
router.get('/suggested', getAllUsers);

export default router;