import { Router } from "express";
import { getCurrentUser,  getUserProfile,  Login, Logout, Register} from "../Controllers/auth.controller.js";

const router = Router();

router.post("/register", Register);
router.post("/login", Login);
router.get('/get-current-user', getCurrentUser);
router.post("/logout", Logout);
router.get('/profile', getUserProfile);

export default router;