import express from "express";

import { deleteUserById } from "../db/users";

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
