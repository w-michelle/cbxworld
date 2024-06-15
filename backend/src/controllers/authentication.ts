import { createPasscode, getPasscode } from "./../db/passcode";
import { createUser, getUserByEmail, getUserById } from "../db/users";
import express from "express";
import { authentication, random } from "../helpers";

//login
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
      return res.sendStatus(400);
    }

    //authenticate using hash comparison

    const expectedHash = authentication(user.authentication.salt, password);

    if (user.authentication.password !== expectedHash) {
      return res.sendStatus(403);
    }

    const salt = random();
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );

    await user.save();
    res.cookie("cbblog-auth", user.authentication.sessionToken, {
      domain: "localhost",
      path: "/",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
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
      return res.sendStatus(400);
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
    console.log(error);
    return res.sendStatus(400);
  }
};

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username, profile, membership } = req.body;

    if (!email || !password || !username || !profile) {
      return res.sendStatus(400);
    }
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.sendStatus(400);
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
    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const logout = async (req: express.Request, res: express.Response) => {
  try {
    // Clear the authentication cookie
    res.clearCookie("cbblog-auth", {
      domain: "localhost",
      path: "/",
    });
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
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

//
