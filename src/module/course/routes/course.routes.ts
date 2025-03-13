import { Router } from "express";
import { CourseController } from "../controller/course.controller";
import { courseSchema } from "../schema/course.schema";
import { validate } from "../../application/middleware/validation.middleware";
import { authGuard, roleGuard } from "../../../infrastructure";
import { UserRoles } from "../../user";
import { asyncHandler } from "../../auth";

export const courseRouter = Router();

courseRouter.post(
  "/",
  roleGuard(UserRoles.admin, UserRoles.teacher),
  validate(courseSchema),
  asyncHandler(CourseController.create),
);

courseRouter.get("/", asyncHandler(CourseController.getAll));

courseRouter.get("/:id", asyncHandler(CourseController.getById));

courseRouter.put(
  "/:id",
  roleGuard(UserRoles.admin, UserRoles.teacher),
  validate(courseSchema),
  asyncHandler(CourseController.update),
);

courseRouter.delete(
  "/:id",
  roleGuard(UserRoles.admin, UserRoles.teacher),
  asyncHandler(CourseController.delete),
);
