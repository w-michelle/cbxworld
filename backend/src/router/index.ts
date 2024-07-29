import express from "express";
import authentication from "./authentication";
import users from "./users";
import post from "./post";
const router = express.Router();

export default (): express.Router => {
  router.options("*", (req, res) => {
    res.header("Access-Control-Allow-Origin", "https://cbxworld.vercel.app");
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.send();
  });

  authentication(router);
  users(router);
  post(router);

  return router;
};
