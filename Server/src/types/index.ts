import { User } from "@prisma/client";

// Interface for Passport OAuth req.user
export interface PassportUser {
  user: User; // Prisma User with id: number
  token: string;
}

// Interface for protect middleware req.user
export interface MiddlewareUser {
  id: string;
  email?: string;
}

