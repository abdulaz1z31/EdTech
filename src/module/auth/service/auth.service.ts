import {
  HashService as hashService,
  jwtService,
} from "../../../infrastructure";
import { UserService as userService } from "../../user";
import { ILoginDto, IRegisterDto } from "../interface/auth.interface";

export const AuthService = {
  async register(dto: IRegisterDto) {
    const isEmailExists = await userService.existsEmail(dto.email);
    if (isEmailExists) {
      throw new Error("Email already exists");
    }
    const user = await userService.create(dto);
    return user;
  },

  async login(dto: ILoginDto) {
    const { password, email } = dto;
    const user = await userService.findByEmail(email);
    const checkPassword = await hashService.compare(password, user.password);
    if (!checkPassword) {
      throw new Error("Email or password invalid");
    }
    const payload = { id: user.id, role: user.role };
    const accessToken = jwtService.generateAccessToken(payload);
    const refreshToken = jwtService.generateRefreshToken(payload);
    return { accessToken, refreshToken };
  },

  async deleteAccount(id: string) {
    return await userService.delete(id);
  },

  async refreshTokens(refreshToken: string) {
    const payload = jwtService.verifyRefreshToken(refreshToken);
    if (!payload) {
      throw new Error("Invalid refresh token");
    }
    const accessToken = jwtService.generateAccessToken({
      id: payload.id,
      role: payload.role,
    });
    return { accessToken };
  },

  async changePassword(id: string, oldPassword: string, newPassword: string) {
    const user = await userService.findById(id);
    const isMatch = await hashService.compare(oldPassword, user.password);
    if (!isMatch) {
      throw new Error("Old password is incorrect");
    }
    await userService.update(id, { password: newPassword });
  },

  async getMe(id: string) {
    return await userService.findById(id);
  },
};
