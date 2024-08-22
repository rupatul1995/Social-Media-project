import { Router } from "express";
import AuthRoutes from "./auth.route.js";
import PostRoutes from "./Post.route.js";
const router = Router();

router.use("/auth", AuthRoutes);

router.use("/post", PostRoutes);

export default router;