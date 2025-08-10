import { ApiError } from "@/utils/ApiError";
import { logger } from "@/utils/logger";
import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

/**
 * Middleware: Handles 404 - Route Not Found
 */
export const notFoundHandler = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const message = `Route ${req.originalUrl} not found`;
  next(new ApiError(404, message));
};

/**
 * Middleware: Handles all unhandled errors globally
 */

interface ICustomError {
  statusCode?: number;
  message?: string;
  stack?: string;
}

const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): void => {
  let statusCode = 500;
  let message = "Internal Server Error";
  let stack: string | undefined;

  // Handle Zod validation errors
  if (err instanceof ZodError) {
    statusCode = 400;
    message = "Validation failed";
    stack = JSON.stringify(err.issues, null, 2); // optional: full error details for dev
  } else if (typeof err === "object" && err !== null) {
    const customError = err as ICustomError;
    statusCode = customError.statusCode ?? statusCode;
    message = customError.message ?? message;
    stack = customError.stack;
  }

  logger.error(`[${req.method}] ${req.originalUrl} - ${message}`, {
    statusCode,
    stack
  });

  if (process.env.NODE_ENV === "production" && statusCode >= 500) {
    logger.info("Error aaya 500 ka");
  }

  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === "production" ? undefined : stack
  });
};

export default errorHandler;
