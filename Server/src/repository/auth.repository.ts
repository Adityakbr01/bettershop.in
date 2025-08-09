// src/repository/auth.repository.ts
import { prisma } from "@/db";
import { User } from "@prisma/client";

export const authRepository = {
  createUser: async (data: {
    email: string;
    password: string;
  }): Promise<User> => {
    return await prisma.user.create({
      data: {
        email: data.email,
        password_hash: data.password
      }
    });
  },

  findUserByEmail: async (email: string): Promise<User | null> => {
    return await prisma.user.findUnique({ where: { email } });
  }
};
