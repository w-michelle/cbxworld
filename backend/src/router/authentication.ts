import express from "express";

import {
  login,
  register,
  registerCode,
  verifyCode,
} from "../controllers/authentication";

export default (router: express.Router) => {
  router.post("/auth/register", register);
  router.post("/auth/login", login);

  router.post("/auth/passcode", registerCode);
  router.post("/auth/join/:id", verifyCode);
};
