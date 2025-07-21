import { createPasscode, getPasscode } from "./../db/passcode";
import {
  createUser,
  getUserByEmail,
  getUserById,
  getUserByUsername,
} from "../db/users";
import express from "express";
import { authentication, generateToken, random } from "../helpers";
import dotenv from "dotenv";

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.sendStatus(400);
    }

    const user = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password"
    );

    if (!user) {
      return res.sendStatus(401);
    }

    //authenticate using hash comparison

    const expectedHash = authentication(user.authentication.salt, password);

    if (user.authentication.password !== expectedHash) {
      return res.sendStatus(401);
    }

    const token = generateToken(user);
    console.log("token", token);

    res.cookie("cbblog-auth", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ user }).end();
  } catch (error) {
    console.log("error:", error);
    return res.sendStatus(400);
  }
};

export const verifyCode = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { passcode } = req.body;

    const user = await getUserById(id);
    const newCode = passcode.join("");
    if (!newCode) {
      return res.sendStatus(403);
    }

    const findPasscode = await getPasscode().select(
      "+authentication.salt +authentication.passcode"
    );

    if (!findPasscode) {
      return res.sendStatus(400);
    }

    const expectedHash = authentication(
      findPasscode.authentication.salt,
      newCode
    );

    if (findPasscode.authentication.passcode !== expectedHash) {
      return res.sendStatus(403);
    }

    user.membership = true;
    await user.save();

    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(400);
  }
};

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username, profile, membership } = req.body;

    if (!email || !password || !username || !profile) {
      return res.sendStatus(400);
    }
    const existingUserByEmail = await getUserByEmail(email);
    const existingUserByUsername = await getUserByUsername(username);

    if (existingUserByEmail) {
      return res.status(409).json({ error: "Email already exists" });
    }

    if (existingUserByUsername) {
      return res.status(409).json({ error: "Username already exists" });
    }

    const salt = random();
    const user = await createUser({
      email,
      username,
      profile,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
      membership,
    });

    const token = generateToken(user);

    res.cookie("cbblog-auth", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ user }).end();
  } catch (error) {
    return res.sendStatus(400);
  }
};

export const registerCode = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { passcode } = req.body;
    if (!passcode) {
      return res.sendStatus(400);
    }

    const salt = random();
    const secretCode = await createPasscode({
      authentication: { salt, passcode: authentication(salt, passcode) },
    });

    return res.status(200).json(secretCode).end();
  } catch (error) {
    return res.sendStatus(400);
  }
};

export const logOut = async (req: express.Request, res: express.Response) => {
  try {
    res.clearCookie("cbblog-auth", {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    return res.status(200).send("Logged out successfully!");
  } catch (error) {
    return res.sendStatus(400);
  }
};
