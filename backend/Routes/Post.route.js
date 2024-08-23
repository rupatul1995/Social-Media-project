import { Router } from "express";
import {
    AllPosts,
    NewPosts,
} from "../Controller/Post.controller.js";

const router = Router();

router.get("/all-post", AllPosts);
router.post("/new-post", NewPosts);

export default router;