import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Course } from "../../course/entity/course.entity";
import { Progress } from "../../progress/entity/progress.entity";
import { FileEntity } from "../../file/entity/file.entity";

@Entity("lesson")
export class Lesson {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 255 })
  title: string;

  @Column({ type: "uuid", name: "course_id" })
  course_id: string;

  @Column({ type: "int" })
  number: number;

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updated_at: Date;

  @ManyToOne(() => Course, (course) => course.lessons, { nullable: false })
  @JoinColumn({ name: "course_id" })
  course: Course;

  @OneToMany(() => Progress, (progress) => progress.lesson)
  progress: Progress[];

  @OneToMany(() => FileEntity, (file) => file.lesson, {onDelete: "CASCADE"})
  files: FileEntity[];
}
