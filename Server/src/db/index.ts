import { PrismaClient } from "@prisma/client";
import { logger } from "@utils/logger";

export const prisma = new PrismaClient();

export async function connectDB() {
  try {
    await prisma.$connect();
    logger.info("Connected to the database successfully");
  } catch (error) {
    logger.error("Failed to connect to the database:", error);
    process.exit(1);
  }
}
