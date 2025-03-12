import {
  Router,
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from "express";
import { AuthController as authController } from "../controller/auth.controller";
import "express-async-errors";
import { registerSchema } from "../schema/register.schema";
import { validate } from "../../application/middleware/validation.middleware";
import { loginSchema } from "../schema/login.schema";
import { refreshTokenSchema } from "../schema/refreshToken.schema";
import { changePasswordSchema } from "../schema/changePassword.schema";
import { authGuard } from "../../../infrastructure";

const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>,
): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
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

authRouter.delete("/me", authGuard, asyncHandler(authController.deleteAccount));

authRouter.post(
  "/refresh",
  validate(refreshTokenSchema),
  authGuard,
  asyncHandler(authController.refreshTokens),
);

authRouter.patch(
  "/change-password",
  validate(changePasswordSchema),
  authGuard,
  asyncHandler(authController.changePassword),
);
