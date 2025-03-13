import { UserRoles } from "../../user";

export interface IRegisterDto {
  full_name: string;
  email: string;
  password: string;
  role: UserRoles;
  balance?: number;
}

export interface ILoginDto {
  email: string;
  password: string;
}
