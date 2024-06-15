import express from "express";

import { deleteUser } from "../controllers/users";
import { findUser, isAuthenticated, isOwner } from "../middlewares";

export default (router: express.Router) => {
  router.get("/getCurrentUser", findUser);
  router.delete("/users/:id", isAuthenticated, isOwner, deleteUser);
};
