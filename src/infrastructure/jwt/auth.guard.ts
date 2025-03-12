import { Request, Response, NextFunction } from "express";
import { jwtService } from "./jwt";

declare module "express" {
  interface Request {
    user?: { id: string; role: string };
  }
}

export const authGuard = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
      return; 
    }

    const decoded = jwtService.verifyAccessToken(token);
    if (!decoded) {
      res.status(403).json({ message: "Token expired" });
      return;
    }

    req.user = decoded;
    next(); 
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
