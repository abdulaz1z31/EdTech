import "reflect-metadata";
import { DataSource } from "typeorm";
import { config } from "./env";
import { User } from "../../module/user/entity/user.entity";

import { Lesson } from "../../module/lesson/entity/lesson.entity";
import { Enrollment } from "../../module/enrollment/entity/enrollment.entity";
import { Progress } from "../../module/progress/entity/progress.entity";
import { Course } from "../../module/course/entity/course.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: config.DB_HOST,
  port: Number(config.DB_PORT) || 5432,
  username: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  entities: [User, Course, Lesson, Enrollment, Progress],
  synchronize: true,
  logging: true,
});

