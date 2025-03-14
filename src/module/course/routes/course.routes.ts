import { Router } from "express";
import { CourseController } from "../controller/course.controller";
import { courseSchema } from "../schema/course.schema";
import { validate } from "../../application/middleware/validation.middleware";
import { roleGuard } from "../../../infrastructure/guard/role.guard";
import { UserRoles } from "../../user";

export const courseRouter = Router();

courseRouter.post(
  "/",
  roleGuard(UserRoles.admin, UserRoles.teacher),
  validate(courseSchema),
  CourseController.create,
);

courseRouter.get("/", CourseController.getAll);

courseRouter.get("/rating", CourseController.getAllWithRaiting);

courseRouter.get("/me", CourseController.getMyCourses);

courseRouter.get("/:id", CourseController.getById);

courseRouter.put(
  "/:id",
  roleGuard(UserRoles.admin, UserRoles.teacher),
  validate(courseSchema),
  CourseController.update,
);

courseRouter.delete(
  "/:id",
  roleGuard(UserRoles.admin, UserRoles.teacher),
  CourseController.delete,
);
