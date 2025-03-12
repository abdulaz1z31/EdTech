import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { User } from "../../user";
import { Lesson } from "../../lesson/entity/lesson.entity";
import { Enrollment } from "../../enrollment/entity/enrollment.entity";

@Entity("course")
export class Course {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ type: "uuid", name: "teacher_id" })
  teacher_id: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price: number;

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updated_at: Date;

  @OneToMany(() => Lesson, (lesson) => lesson.course)
  lessons: Lesson[];

  @OneToMany(() => Enrollment, (entollmetn) => entollmetn.course)
  enrollments: Course[];

  @ManyToOne(() => User, (user) => user.courses, { nullable: false })
  @JoinColumn({ name: "teacher_id" })
  user: User;
}
