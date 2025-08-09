// backend/middleware/validateRequest.ts
import { sendError } from "@/utils/responseUtil";
import { NextFunction, Request, Response, RequestHandler } from "express";
import { ZodError, ZodSchema } from "zod";

export const validateRequest = (schema: ZodSchema): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const requestData = {
        ...req.body,
        ...req.files
      };

      if (!requestData || Object.keys(requestData).length === 0) {
        sendError(res, 400, "Request body is missing");
        return;
      }

      schema.parse(requestData);
      // Attach parsed data to req for the controller to use
      req.body = requestData;
      next();
    } catch (err: unknown) {
      if (err instanceof ZodError) {
        sendError(res, 400, "Validation failed", err.issues);
      } else {
        sendError(res, 400, "Unexpected error during validation");
      }
    }
  };
};
