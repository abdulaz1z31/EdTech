import { Request, Response, NextFunction } from "express";

export const roleGuard = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    console.log(req.user);
      
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({ message: "Forbidden: Access denied" });
      return;
    }
    next();
  };
};
