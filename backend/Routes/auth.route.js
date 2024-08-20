import { Router } from "express";
import { Login, Register, Logout,getCurrentUser } from "../Controllers/auth.controllers.js";

const router = Router();

router.post("/register", Register);
router.post("/login", Login);
router.get('/get-current-user', getCurrentUser)

router.post("/logout", Logout);

export default router;