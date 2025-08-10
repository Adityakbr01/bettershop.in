import { constant } from "@/configs/_Config";

export const getCookieConfig = (maxAge = constant.ENV.ACCESSTOKEN_EXPIRES_IN) => ({ // 60 min
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  maxAge
});
