import { Request, Response } from "express";
import { wrapAsync } from "@/utils/wrapAsync";
import authService from "@services/auth.service";
import { sendSuccess } from "@utils/responseUtil";
import { generateAuthToken } from "@utils/jwtUtil";
import { getCookieConfig } from "@configs/cookieConfig";

const authController = {
  signup: wrapAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await authService.signup(email, password);
    sendSuccess(res, 201, "Signup successful", user);
  }),

  signin: wrapAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await authService.signin(email, password);

    const accessToken = generateAuthToken({ id: user.id, email: user.email });

   res.cookie("accessToken", accessToken, getCookieConfig());
    sendSuccess(res, 200, "Signin successful", user);
  }),

  logout: wrapAsync(async (_req: Request, res: Response) => {
    res.clearCookie("accessToken");
    sendSuccess(res, 200, "Logout successful");
  }),

  getMe: wrapAsync(async (req: Request, res: Response) => {
    if (!req.user) {
      throw new Error("User not found");
    }
    const user = await authService.getMe(req.user.email);
    sendSuccess(res, 200, "Success", user);
  })
};

export default authController;
