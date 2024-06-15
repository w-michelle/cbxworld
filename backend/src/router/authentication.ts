import express from "express";

import {
  login,
  logout,
  register,
  registerCode,
  verifyCode,
} from "../controllers/authentication";
import { isAuthenticated } from "../middlewares";

export default (router: express.Router) => {
  router.post("/auth/register", register);
  router.post("/auth/login", login);
  router.post("/auth/logout", logout);
  router.post("/auth/passcode", registerCode);
  router.post("/auth/join/:id", verifyCode);
};
