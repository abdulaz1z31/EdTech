import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserRoles } from "../constants/user.constants";

@Entity({ name: "user" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar" })
  full_name: string;

  @Column({ type: "varchar",  unique: true })
  email: string;

  @Column({ type: "varchar" })
  password: string;

  @Column({ type: "enum", enum: UserRoles})
  role: UserRoles;

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updated_at: Date;
}
