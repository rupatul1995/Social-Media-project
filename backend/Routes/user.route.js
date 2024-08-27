import { Router } from "express";
import { followOrUnfollow ,editProfile, getProfile, getSuggestedUsers, Login, Logout, Register } from "../Controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";

const router = Router();

router.post("/register", Register);
router.post("/login", Login);
router.get("/logout", Logout);
router.get('/:id/profile', isAuthenticated, getProfile);
router.post("/profile/edit", isAuthenticated, upload.single('profilePicture') , editProfile);
router.get("/suggested", isAuthenticated, getSuggestedUsers);
router.post("/followorunfollow/:id", isAuthenticated, followOrUnfollow);


export default router;