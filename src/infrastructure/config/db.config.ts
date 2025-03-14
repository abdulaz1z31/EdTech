import "reflect-metadata";
import { DataSource } from "typeorm";
import { config } from "./env";
import { User } from "../../module/user";
import { Course } from "../../module/course";
import { Lesson } from "../../module/lesson";
import { Enrollment } from "../../module/enrollment";
import { Progress } from "../../module/progress";
import { FileEntity } from "../../module/file";
import { Payment } from "../../module/payment";
import { Rating } from "../../module/raiting";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: config.DB_HOST,
  port: Number(config.DB_PORT) || 5432,
  username: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  entities: [
    User,
    Course,
    Lesson,
    Enrollment,
    Progress,
    FileEntity,
    Payment,
    Rating,
  ],
  synchronize: true,
  logging: false,
});
