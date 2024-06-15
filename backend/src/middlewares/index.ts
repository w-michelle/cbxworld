import express from "express";
import { get, merge } from "lodash";

import { getUserBySessionToken } from "../db/users";

export const isOwner = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id } = req.params;
    //identity is an object with ._id because it was merged with existing so there is _id
    const currentUserId = get(req, "identity._id") as string;

    if (!currentUserId) {
      return res.sendStatus(403);
    }

    if (currentUserId.toString() !== id) {
      return res.sendStatus(403);
    }

    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const sessionToken = req.cookies["cbblog-auth"];

    if (!sessionToken) {
      return res.sendStatus(403);
    }

    //check if tehre is existing user with this sessiontoken

    const existingUser = await getUserBySessionToken(sessionToken);

    if (!existingUser) {
      return res.sendStatus(403);
    }
    //merge to
    merge(req, { identity: existingUser });

    return next();
  } catch (error) {
    return res.sendStatus(400);
  }
};

export const findUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const sessionToken = req.cookies["cbblog-auth"];

    if (!sessionToken) {
      return res.sendStatus(403);
    }

    //check if tehre is existing user with this sessiontoken

    const existingUser = await getUserBySessionToken(sessionToken);

    if (!existingUser) {
      return res.sendStatus(403);
    }
    //merge to

    const user = existingUser;
    res.json({ user });
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
