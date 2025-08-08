import dayjs from "dayjs";
import { nanoid } from "nanoid";

export const generateUniqueId = (length = 10): string => nanoid(length);

export const sleep = (ms: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms));

export const formatDate = (
  date: string | Date,
  format = "DD MMM YYYY"
): string => dayjs(date).format(format);

export const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export const isBrowser = typeof window !== "undefined";
export const isServer = typeof window === "undefined";

export const safeJsonParse = <T>(value: string): T | null => {
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
};
