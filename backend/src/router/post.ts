import express from "express";

import {
  createPost,
  deletePost,
  getAllPosts,
  userPosts,
} from "../controllers/posts";

export default (router: express.Router) => {
  router.get("/getPosts", getAllPosts);
  router.get("/userPosts/:userId", userPosts);
  router.post("/createPost", createPost);
  router.delete("/post/:id", deletePost);
};
