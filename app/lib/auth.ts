import jwt from "jsonwebtoken";

const JWT_SECRET = "supersecretkey"; // later .env me dalenge

export function signToken(payload: any) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}
// const bcrypt = require("bcryptjs");
// bcrypt.hash("123", 10).then(console.log);

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}