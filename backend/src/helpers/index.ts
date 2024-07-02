import crypto from "crypto";
const SECRET = "MICH-REST-API";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const secretKey = process.env.TOKEN_SECRET;

export const random = () => crypto.randomBytes(128).toString("base64");
export const authentication = (salt: string, password: string) => {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(SECRET)
    .digest("hex");
};

export const generateToken = (user: any) =>
  jwt.sign({ userId: user._id }, secretKey, { expiresIn: "24h" });
