export interface ErrorMeta {
  cause?: unknown;
  details?: unknown; // additional context like request data or payload
}

/**
 * Custom Error class for operational errors (e.g., bad input, validation)
 */
export class ApiError extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}
