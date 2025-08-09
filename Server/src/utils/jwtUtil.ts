import { constant } from "@configs/_Config";
import jwt from "jsonwebtoken";

export interface TokenPayload {
  id: string | number;
  email: string;
  role?: string;
  tokenVersion?: number;
}

const jwtSecret = constant.ENV.JWT_SECRET;
if (!jwtSecret) {
  throw new Error("JWT_SECRET is not defined in environment");
}

export const generateAuthToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, jwtSecret as string, {
    expiresIn: "15min" // short-lived token
  });
};

export const generateRefreshToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, jwtSecret as string, {
    expiresIn: "30d" // long-lived refresh token
  });
};

export const verifyJwt = (token: string): TokenPayload => {
  return jwt.verify(token, jwtSecret) as TokenPayload;
};
