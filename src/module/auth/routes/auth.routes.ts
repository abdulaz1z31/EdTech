import { NextFunction, Request, RequestHandler, Response, Router } from "express";
import { AuthController as authController } from "../controller/auth.controller";
import { registerSchema } from "../schema/register.schema";
import { validate } from "../../application/middleware/validation.middleware";
import { loginSchema } from "../schema/login.schema";
import { refreshTokenSchema } from "../schema/refreshToken.schema";
import { changePasswordSchema } from "../schema/changePassword.schema";
import { authGuard } from "../../../infrastructure";

import "express-async-errors";
export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>,
): RequestHandler => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
export const authRouter = Router();

authRouter.post(
  "/register",
  validate(registerSchema),
  asyncHandler(authController.register),
);

authRouter.post(
  "/login",
  validate(loginSchema),
  asyncHandler(authController.login),
);

authRouter.get("/me", authGuard, asyncHandler(authController.getProfile));

authRouter.post(
  "/refresh",
  validate(refreshTokenSchema),
  asyncHandler(authController.refreshTokens),
);

authRouter.delete("/delete/me", authGuard, asyncHandler(authController.deleteAccount));

authRouter.patch(
  "/change-password",
  validate(changePasswordSchema),
  authGuard,
  asyncHandler(authController.changePassword),
);
