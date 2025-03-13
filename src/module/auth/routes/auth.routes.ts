import { NextFunction, Request, Response, Router } from "express";
import { AuthController as authController } from "../controller/auth.controller";
import { registerSchema } from "../schema/register.schema";
import { validate } from "../../application/middleware/validation.middleware";
import { loginSchema } from "../schema/login.schema";
import { refreshTokenSchema } from "../schema/refreshToken.schema";
import { changePasswordSchema } from "../schema/changePassword.schema";
import { authGuard } from "../../../infrastructure";

export const authRouter = Router();

authRouter.post("/register", validate(registerSchema), authController.register);

authRouter.post("/login", validate(loginSchema), authController.login);

authRouter.get("/me", authGuard, authController.getProfile);

authRouter.post(
  "/refresh",
  validate(refreshTokenSchema),
  authController.refreshTokens,
);

authRouter.delete("/delete/me", authGuard, authController.deleteAccount);

authRouter.patch(
  "/change-password",
  validate(changePasswordSchema),
  authGuard,
  authController.changePassword,
);
