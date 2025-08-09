// types/express/index.d.ts

import "express";

declare global {
  namespace Express {
    export interface Request {
      files?: Record<string, Express.Multer.File[]> | Express.Multer.File[];
      file?: Express.Multer.File;
    }
  }
}

