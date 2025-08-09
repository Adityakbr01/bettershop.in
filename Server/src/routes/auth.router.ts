import { protect } from "@/middleware/authMiddleware";
import { constant } from "@configs/_Config";
import { getCookieConfig } from "@configs/cookieConfig";
import { User } from "@prisma/client";
import express, { Router } from "express";
import passport from "passport";
import authController from "../controllers/auth.controller";
import { validateRequest } from "../middleware/validateRequest";
import { UserSigninSchema, UserSignupSchema } from "../validator/user.schema";

const authRouter: Router = express.Router();

// GitHub OAuth Routes
authRouter.get(
    "/github",
    passport.authenticate("github", { scope: ["user:email"], session: false })
);

interface GitHubAuthUser {
    user: User;
    jwtToken: string;
}

authRouter.get(
    "/github/callback",
    passport.authenticate("github", { failureRedirect: "/login", session: false }),
    (req, res) => {
        //user
        const { jwtToken } = req.user as unknown as GitHubAuthUser;

        res.cookie("accessToken", jwtToken, getCookieConfig());


        // const sanitizedUser = sanitizeUser(user, [
        //     "id",
        //     "email",
        //     "name",
        //     "created_at",
        //     "role",
        //     "status"
        // ]);
        res.redirect(constant.ENV.CORS_ORIGIN)
        // sendSuccess(res, 200, "Success", {
        //     sanitizedUser,
        //     token: jwtToken
        // })
    }
);

// Local Auth Routes
authRouter.post(
    "/signup",
    validateRequest(UserSignupSchema),
    authController.signup
);
authRouter.post(
    "/signin",
    validateRequest(UserSigninSchema),
    authController.signin
);
authRouter.post("/logout", protect, authController.logout);
authRouter.get("/me", protect, authController.getMe);

export default authRouter;
