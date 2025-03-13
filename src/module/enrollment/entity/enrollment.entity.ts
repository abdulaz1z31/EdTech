import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from "typeorm";
import { User } from "../../user";
import { Course } from "../../course/entity/course.entity";
import { EnrollmentStatus } from "../interface/enrollment.interface";

@Entity("enrollments")
export class Enrollment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "uuid", name: "student_id" })
  student_id: string;

  @Column({ type: "uuid", name: "course_id" })
  course_id: string;

  @Column({
    type: "enum",
    enum: EnrollmentStatus,
    default: EnrollmentStatus.PENDING,
  })
  status: EnrollmentStatus;

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.enrollments)
  @JoinColumn({ name: "student_id" })
  student: User;

  @ManyToOne(() => Course, (course) => course.enrollments)
  @JoinColumn({ name: "course_id" })
  course: Course;
}
