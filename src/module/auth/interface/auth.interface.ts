import { UserRoles } from "../../user";

export interface IRegisterDto {
  full_name: string;
  email: string;
  password: string;
  role: UserRoles; 
}

export interface ILoginDto {
  email: string;
  password: string;
}
