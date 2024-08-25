import { Router } from "express";
import { AllPosts  ,NewPosts } from "../Controller/Post.controller.js";

const router = Router();

router.get("/all-posts", AllPosts);
router.post("/New-Posts", NewPosts);

// router.get("/comment/:id", Comment);
// router.post("/like/:id", Like);

export default router;