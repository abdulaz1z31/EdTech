import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "../../user";
import { Course } from "../../course/entity/course.entity";

@Entity("rating")
export class Rating {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text" })
  comment: string;

  @Column({ type: "int" })
  rating: number;

  @Column({ type: "uuid", name: "student_id" })
  student_id: string;

  @Column({ type: "uuid", name: "course_id" })
  course_id: string;

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.ratings, { onDelete: "CASCADE" })
  @JoinColumn({ name: "student_id" })
  student: User;

  @ManyToOne(() => Course, (course) => course.ratings, { onDelete: "CASCADE" })
  @JoinColumn({ name: "course_id" })
  course: Course;
}
