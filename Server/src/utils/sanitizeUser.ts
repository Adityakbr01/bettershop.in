import { User } from "@prisma/client";

/**
 * Picks only the allowed fields from the User object.
 * Type-safe, null-safe, and works with Partial<User>.
 */
export const sanitizeUser = <K extends keyof User>(
  user: User,
  allowedFields: K[]
): Pick<User, K> => {
  const sanitizedUser = {} as Pick<User, K>;

  for (const field of allowedFields) {
    sanitizedUser[field] = user[field];
  }

  return sanitizedUser;
};
