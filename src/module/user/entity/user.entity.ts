import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { UserRoles } from "../constants/user.constants";
import { Course } from "../../course/entity/course.entity";
import { Enrollment } from "../../enrollment/entity/enrollment.entity";
import { Progress } from "../../progress/entity/progress.entity";

@Entity({ name: "user" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar" })
  full_name: string;

  @Column({ type: "varchar", unique: true })
  email: string;

  @Column({ type: "varchar" })
  password: string;

  @Column({ type: "enum", enum: UserRoles })
  role: UserRoles;

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updated_at: Date;

  @OneToMany(() => Course, (course) => course.user)
  courses: Course[];

  @OneToMany(() => Progress, (progress) => progress.student)
  progress: Progress[];

  @OneToMany(() => Enrollment, (enrollment) => enrollment.student)
  enrollments: Enrollment[];
}
