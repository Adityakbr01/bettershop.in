// src/services/authService.ts
import { authRepository } from "@/repository/auth.repository";
import { ApiError } from "@utils/ApiError";
import { comparePassword, hashPassword } from "@utils/bcryptUtil";
import { sanitizeUser } from "@utils/sanitizeUser";

const authService = {
  signup: async (email: string, password: string) => {
    const existingUser = await authRepository.findUserByEmail(email);

    if (existingUser) {
      throw new ApiError(400, "User already exists");
    }

    const hashedPassword = await hashPassword(password);
    const user = await authRepository.createUser({
      email,
      password: hashedPassword
    });

    const sanitizedUser = sanitizeUser(user, [
      "id",
      "email",
      "name",
      "created_at",
      "role",
      "status"
    ]);

    return sanitizedUser;
  },

  signin: async (email: string, password: string) => {
    const user = await authRepository.findUserByEmail(email);

    if (!user || !user.password_hash) {
      throw new ApiError(401, "INVALID_CREDENTIALS");
    }

    const isMatch = await comparePassword(password, user.password_hash);
    if (!isMatch) {
      throw new ApiError(401, "INVALID_CREDENTIALS");
    }

    const sanitizedUser = sanitizeUser(user, [
      "id",
      "email",
      "name",
      "created_at",
      "role",
      "status"
    ]);

    return sanitizedUser;
  },

  logout: async () => {
    // You can clear session or tokens here if needed
    return { message: "Logout successful" };
  },

  getMe: async (email: string) => {
    if (!email) {
      throw new ApiError(401, "USER_NOT_FOUND");
    }
    const findedUser = await authRepository.findUserByEmail(email);
    if (!findedUser) {
      throw new ApiError(401, "USER_NOT_FOUND");
    }

    const sanitizedUser = sanitizeUser(findedUser, [
      "id",
      "email",
      "name",
      "created_at",
      "role",
      "status"
    ]);

    return sanitizedUser;
  }
};

export default authService;
