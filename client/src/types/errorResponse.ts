export interface ErrorResponse {
  message: string;
  errorCode: string;
  statusCode: number;
  meta?: { cause?: unknown; details?: unknown };
}
