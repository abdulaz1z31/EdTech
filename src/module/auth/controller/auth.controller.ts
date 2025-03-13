import { NextFunction, Request, Response } from "express";
import { AuthService as authService } from "../service/auth.service";

export const AuthController = {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body;
      const user = await authService.register(dto);
      return res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  },

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body;
      const data = await authService.login(dto);
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  },

  async deleteAccount(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.user.id;
      await authService.deleteAccount(id);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  },

  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.user.id;
      const user = await authService.getMe(id);
      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },

  async refreshTokens(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body;
      const tokens = await authService.refreshTokens(refreshToken);
      return res.status(200).json(tokens);
    } catch (error) {
      next(error);
    }
  },

  async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id;
      const { oldPassword, newPassword } = req.body;
      await authService.changePassword(userId, oldPassword, newPassword);
      return res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
      next(error);
    }
  },
};
