import jwt from "jsonwebtoken";
import { config } from "../config";
import { UserRoles } from "../../module/user";

type Payload = {
  id: string;
  role: UserRoles;
};

export const jwtService = {
  generateAccessToken(payload: Payload): string {
    return jwt.sign(payload, config.ACCESS_SECRET, {
      expiresIn: config.ACCESS_TIME,
    });
  },

  generateRefreshToken(payload: Payload): string {
    return jwt.sign(payload, config.REFRESH_SECRET, {
      expiresIn: config.REFRESH_TIME,
    });
  },

  verifyAccessToken(token: string): Payload | null {
    try {
      return jwt.verify(token, config.ACCESS_SECRET) as Payload;
    } catch (error) {
      console.error("Invalid Access Token:", (error as Error).message);
      return null;
    }
  },

  verifyRefreshToken(token: string): Payload | null {
    try {
      return jwt.verify(token, config.REFRESH_SECRET) as Payload;
    } catch (error) {
      console.error("Invalid Refresh Token:", (error as Error).message);
      return null;
    }
  },
};
