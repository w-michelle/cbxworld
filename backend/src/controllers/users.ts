import express from "express";

import { deleteUserById, getUserBySessionToken } from "../db/users";

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
    const sessionToken = req.cookies["cbblog-auth"];

    if (!sessionToken) {
      return res.sendStatus(403);
    }

    const existingUser = await getUserBySessionToken(sessionToken);

    if (!existingUser) {
      return res.sendStatus(403);
    }

    const user = existingUser;
    res.json({ user });
  } catch (error) {
    return res.sendStatus(400);
  }
};
