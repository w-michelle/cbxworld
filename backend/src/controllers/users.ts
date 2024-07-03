import express from "express";

import {
  deleteUserById,
  getUserById,
  getUserBySessionToken,
} from "../db/users";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { TokenPayload } from "../types/types";

dotenv.config();

export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const deleteUser = await deleteUserById(id);
    return res.sendStatus(400);
  } catch (error) {
    return res.sendStatus(400);
  }
};

export const getCurrentUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.sendStatus(403);
    }

    const token = authHeader.split(" ")[1];

    let decoded: TokenPayload;
    try {
      decoded = jwt.verify(token, process.env.TOKEN_SECRET) as TokenPayload;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return res
          .status(401)
          .json({ message: "Token has expired, please log in again" });
      } else if (error instanceof jwt.JsonWebTokenError) {
        return res.status(401).json({ message: "Invalid token" });
      } else {
        return res.status(500).json({ message: "Interval server error" });
      }
    }

    const user = await getUserById(decoded.userId);

    if (!user) {
      return res.sendStatus(403);
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Interval server error" });
  }
};
