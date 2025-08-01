import { getUserBySessionToken } from "../db/users";
import {
  createNewPost,
  deletePostById,
  getPostById,
  getPosts,
} from "../db/posts";
import jwt from "jsonwebtoken";
import express from "express";
import dotenv from "dotenv";
import { TokenPayload } from "../types/types";

dotenv.config();

export const createPost = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { author, content } = req.body;

    if (!author || !content) {
      console.log("author", author, "content", content);
      return res.sendStatus(400);
    }

    const addPost = await createNewPost({ author, content });
    return res.status(200).json(addPost).end();
  } catch (error) {
    return res.sendStatus(400);
  }
};

export const getAllPosts = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const posts = await getPosts();

    const getAnonPosts = (posts: any[]) => {
      return posts.map((post) => {
        const postObj = post.toObject();
        return { ...postObj, author: { _id: postObj._id, username: "anon" } };
      });
    };

    const token = req.cookies["cbblog-auth"];

    if (!token) {
      return res.status(200).json(getAnonPosts(posts));
    }

    let decoded: TokenPayload;
    try {
      decoded = jwt.verify(token, process.env.TOKEN_SECRET) as TokenPayload;
    } catch (error) {
      return res.status(200).json(getAnonPosts(posts));
    }

    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const userPosts = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { userId } = req.params;

    const posts = await getPostById(userId);

    if (!posts || posts.length === 0) {
      return res.status(404).json({ error: "No posts found" });
    }
    return res.status(200).json({ posts });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deletePost = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    await deletePostById(id);

    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    return res.status(400);
  }
};
