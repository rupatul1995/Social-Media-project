import { Router } from "express";
import { AddPost, Comment, Feed, Like } from "../Controller/Post.controller.js";

const router = Router();

router.get("/feed/:userId", Feed);
router.post("/", AddPost);

router.get("/comment/:id", Comment);
router.post("/like/:id", Like);

export default router;