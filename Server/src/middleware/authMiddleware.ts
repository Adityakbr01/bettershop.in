import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { authRepository } from "@/repository/auth.repository";
import { ApiError } from "@utils/ApiError";
import { verifyJwt } from "@utils/jwtUtil";

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace Express {
    interface User {
      id: number;
      email: string;
      role: string;
      token?: string;
      tokenVersion?: number;
    }
  }
}

export const protect = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.headers.authorization?.split(" ")[1] ||
      null;

    if (!token) {
      throw new ApiError(401, "NOT_AUTHORIZED");
    }

    const decoded = verifyJwt(token);
    const user = await authRepository.findUserByEmail(decoded.email);

    if (!user) {
      throw new ApiError(401, "USER_NOT_FOUND");
    }

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw new ApiError(401, "NOT_AUTHORIZED");
    }
    next(error);
  }
};
