import { getUserBySessionToken } from "../db/users";
import { createNewPost, getPosts } from "../db/posts";
import express from "express";

export const createPost = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { author, content } = req.body;

    if (!author || !content) {
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
    const sessionToken = req.cookies["cbblog-auth"];
    const posts = await getPosts();

    if (!sessionToken) {
      const anonPosts = posts.map((post) => {
        const postObj = post.toObject();
        return { ...postObj, author: { _id: postObj._id, username: "anon" } };
      });
      return res.status(200).json(anonPosts);
    }

    //check if tehre is existing user with this sessiontoken
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
