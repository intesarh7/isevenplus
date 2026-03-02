import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_key_change_this";

/**
 * Create JWT Token
 */
export function signToken(payload: any) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "1d", // token expiry
  });
}

/**
 * Verify JWT Token
 */
export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}