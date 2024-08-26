import { Router } from "express";
import AuthRoutes from "./auth.route.js";
import PostRoutes from "./Post.route.js";
import userRoutes from "./user.route.js"
const router = Router();

router.use("/auth", AuthRoutes);
router.use("/user", userRoutes);

router.use("/post", PostRoutes);

export default router;