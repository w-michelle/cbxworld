import express from "express";
import authentication from "./authentication";
import users from "./users";
import post from "./post";
const router = express.Router();

export default (): express.Router => {
  authentication(router);
  users(router);
  post(router);

  return router;
};
