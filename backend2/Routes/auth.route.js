import { Router } from "express";
import { editProfile, followOrUnfollow, getCurrentUser, getProfile, getSuggestedUsers, Login, Logout, Register } from "../Controllers/auth.controller.js";
import isAuthenticated from "../Middlewares/isAutheticated.js";
import upload from "../Middlewares/multer.js";

const router = Router();

router.post("/register", Register);
router.post("/login", Login);
router.get('/get-current-user', getCurrentUser)
router.post("/logout", Logout);
router.get('/:id/profile', isAuthenticated, getProfile);
router.post("/profile/edit", isAuthenticated, upload.single('profilePicture') , editProfile);
router.get("/suggested", isAuthenticated, getSuggestedUsers);
router.post("/followorunfollow/:id", isAuthenticated, followOrUnfollow);

export default router;