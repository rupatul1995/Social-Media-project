import { Router } from "express";
import { Follow, Login,  Register } from "../Controller/auth.controller.js";

const router = Router();

router.post("/register", Register);
router.post("/login", Login);

router.post("/follow", Follow);
// router.get('/get-current-user', getCurrentUser)

// router.post("/logout", Logout);

export default router;