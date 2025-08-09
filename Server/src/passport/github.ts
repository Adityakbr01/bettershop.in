import passport from "passport";
import { Strategy as GitHubStrategy, Profile } from "passport-github2";
import { prisma } from "@/db";
import { constant } from "@configs/_Config";
import { BehaviorType, User } from "@prisma/client";
import { generateAuthToken } from "@utils/jwtUtil";
import { ApiError } from "@utils/ApiError";
import fetch from "node-fetch"; // make sure installed

const CALLBACK_URL = constant.ENV.GITHUB_CALLBACK_URL;
const GITHUB_CLIENT_ID = constant.ENV.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = constant.ENV.GITHUB_CLIENT_SECRET;

if (!CALLBACK_URL) {
  throw new ApiError(500, "GITHUB_CALLBACK_URL is not defined in environment");
}

if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
  throw new ApiError(
    500,
    "GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET is not defined in environment"
  );
}

passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: CALLBACK_URL,
      scope: ["user:email"], // make sure this is here
    },
    async (
      _accessToken: string,
      _refreshToken: string,
      profile: Profile,
      done: (
        error: unknown,
        user?:
          | {
              user: User;
              jwtToken: string;
            }
          | false
      ) => void
    ) => {
      try {
        // 🛠 Step 1: Try from profile
        let email = profile.emails?.[0]?.value || null;

        // 🛠 Step 2: If email not found or placeholder, fetch from API
        if (!email || email.includes("@placeholder.com")) {
          const res = await fetch("https://api.github.com/user/emails", {
            headers: {
              Authorization: `token ${_accessToken}`,
              "User-Agent": "Node.js",
            },
          });

          if (!res.ok) {
            throw new Error(`Failed to fetch emails: ${res.statusText}`);
          }
         const emails: { email: string; primary: boolean; verified: boolean }[] = [];

          const primaryEmail = emails.find((e) => e.primary && e.verified);
          if (primaryEmail) {
            email = primaryEmail.email;
          }
        }

        // 🛠 Step 3: Now proceed with DB operations
        let user = await prisma.user.findUnique({
          where: { providerId: profile.id },
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              name: profile.displayName || profile.username,
              email: email || `github_${profile.id}@placeholder.com`,
              provider: "github",
              providerId: profile.id,
            },
          });
        }

        await prisma.userBehaviorLog.create({
          data: {
            user_id: user.id,
            type: BehaviorType.oauth_login,
            metadata: {
              provider: "github",
              githubId: profile.id,
              username: profile.username,
              loginTime: new Date().toISOString(),
            },
          },
        });

        const jwtToken = generateAuthToken({ id: user.id, email: user.email });
        return done(null, { user, jwtToken });
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

export default passport;
