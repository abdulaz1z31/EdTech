import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { FileType } from "../interface/file.interface";
import { Lesson } from "../../lesson/entity/lesson.entity";

@Entity("file")
export class FileEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "uuid", name: "lesson_id" })
  lesson_id: string;

  @Column({ type: "varchar" })
  url: string;

  @Column({
    type: "enum",
    enum: FileType,
  })
  file_type: FileType;

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updated_at: Date;

  @ManyToOne(() => Lesson, (lesson) => lesson.files, { nullable: false })
  @JoinColumn({ name: "lesson_id" })
  lesson: Lesson;
}
