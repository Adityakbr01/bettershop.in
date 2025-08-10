import passport from "passport";
import { Strategy as GoogleStrategy, Profile, VerifyCallback } from "passport-google-oauth20";
import { Request } from "express";
import { prisma } from "@/db";
import { constant } from "@configs/_Config";
import { BehaviorType } from "@prisma/client";
import { generateAuthToken } from "@utils/jwtUtil";
import { ApiError } from "@utils/ApiError";

const CALLBACK_URL = constant.ENV.GOOGLE_CALLBACK_URL;
const GOOGLE_CLIENT_ID = constant.ENV.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = constant.ENV.GOOGLE_CLIENT_SECRET;

if (!CALLBACK_URL) {
  throw new ApiError(500, "GOOGLE_CALLBACK_URL is not defined in environment");
}
if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
  throw new ApiError(500, "GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET is not defined in environment");
}

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: CALLBACK_URL,
      scope: ["email", "profile"],
      passReqToCallback: true,
    },
    async (
      req: Request,
      _accessToken: string,
      _refreshToken: string,
      profile: Profile,
      done: VerifyCallback
    ) => {
      try {
        const email = profile.emails?.[0]?.value || req.user?.email;

        let user = await prisma.user.findUnique({
          where: { providerId: profile.id },
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              name: profile.displayName || "No Name",
              email: email || `google_${profile.id}@placeholder.com`,
              provider: "google",
              providerId: profile.id,
            },
          });
        }

        await prisma.userBehaviorLog.create({
          data: {
            user_id: user.id,
            type: BehaviorType.oauth_login,
            metadata: {
              provider: "google",
              googleId: profile.id,
              loginTime: new Date().toISOString(),
            },
          },
        });

        const jwtToken = generateAuthToken({ id: user.id, email: user.email });
        return done(null, user, { jwtToken });
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

export default passport;
