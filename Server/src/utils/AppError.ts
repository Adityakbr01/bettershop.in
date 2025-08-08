// src/utils/AppError.ts
import { logger } from "@utils/logger";

export interface ErrorMeta {
  cause?: unknown;
  details?: unknown; // additional context (e.g., input data)
}

/**
 * Custom AppError for controlled error handling
 */
export class AppError extends Error {
  public statusCode: number;
  public errorCode: string;
  public isOperational: boolean;
  public meta?: ErrorMeta;

  constructor(
    message: string,
    statusCode = 500,
    errorCode = "INTERNAL_ERROR",
    meta?: ErrorMeta
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.isOperational = true; // distinguish operational errors
    this.meta = meta;

    Error.captureStackTrace(this, this.constructor);

    // Logging only for non-production or if explicitly needed
    if (process.env.NODE_ENV !== "production") {
      logger.error(`[AppError] ${errorCode}: ${message}`);
      if (meta?.cause) logger.error(`[Cause] ${JSON.stringify(meta.cause)}`);
      if (meta?.details)
        logger.error(`[Details] ${JSON.stringify(meta.details)}`);
    }
  }
}
