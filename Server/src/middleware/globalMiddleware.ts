// src/middlewares/globalMiddleware.ts
import { Request, Response, NextFunction } from "express";

/**
 * 404 Not Found handler
 */
export const notFoundHandler = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const message = `Route ${req.originalUrl} not found`;
  next(new AppError(message, 404, "ROUTE_NOT_FOUND"));
};

import { logger } from "@utils/logger";
import { AppError } from "@utils/AppError";

/**
 * Global Express error handler
 */
export const errorHandler = (err: Error, _req: Request, res: Response) => {
  const isAppError = err instanceof AppError;
  const statusCode = isAppError ? err.statusCode : 500;
  const errorCode = isAppError ? err.errorCode : "INTERNAL_SERVER_ERROR";
  const message = isAppError ? err.message : "Something went wrong";

  // Always log in production too, for monitoring
  logger.error(`[${errorCode}] ${message}`);
  if (!isAppError) logger.error(err.stack || "No stack trace available");

  res.status(statusCode).json({
    success: false,
    errorCode,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack })
  });
};
