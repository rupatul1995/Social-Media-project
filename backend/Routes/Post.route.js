import { Router } from "express";
import {
    Allposts,
    NewPosts,
} from "../Controller/Post.controller.js";

const router = Router();

router.get("/all-post", Allposts);
router.post("/new-post", NewPosts);

export default router;