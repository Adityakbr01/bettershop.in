import { constant } from "@/configs/_Config";

export const getCookieConfig = (maxAge = constant.ENV.ACCESSTOKEN_EXPIRES_IN) => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  path: "/",
  maxAge: maxAge * 1000 // maxAge in seconds * 1000 to convert to milliseconds
});
