import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from "typeorm";
import { User } from "../../user";
import { ProgressStatus } from "../interface/progress.interface";
import { Lesson } from "../../lesson/entity/lesson.entity";

@Entity("progress")
export class Progress {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "uuid", name: "student_id" })
  student_id: string;

  @Column({ type: "uuid", name: "lesson_id" })
  lesson_id: string;

  @Column({
    type: "enum",
    enum: ProgressStatus,
    default: ProgressStatus.NOT_STARTED,
  })
  status: ProgressStatus;

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.progress, { nullable: false })
  @JoinColumn({ name: "student_id" })
  student: User;

  @ManyToOne(() => Lesson, (lesson) => lesson.progress, { nullable: false })
  @JoinColumn({ name: "lesson_id" })
  lesson: Lesson;
}
