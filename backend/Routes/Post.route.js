import { Router } from "express";
import { AllPosts  ,NewPosts , Profile } from "../Controller/Post.controller.js";

const router = Router();

router.get("/all-posts", AllPosts);
router.post("/New-Posts", NewPosts);

router.post("/get-profile", Profile);

// router.get("/comment/:id", Comment);
// router.post("/like/:id", Like);

export default router;