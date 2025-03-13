export enum UserRoles {
  admin = "ADMIN",
  teacher = "TEACHER",
  student = "STUDENT",
}


export interface IUser {
  full_name: string;
  email: string;
  password: string;
  role: UserRoles;
  balance?: number;
  created_at?: Date;
  updated_at?: Date;
}
