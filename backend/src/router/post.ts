import express from "express";

import { createPost, getAllPosts } from "../controllers/posts";

export default (router: express.Router) => {
  router.get("/getPosts", getAllPosts);
  router.post("/createPost", createPost);
};
