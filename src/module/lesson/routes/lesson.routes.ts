import { Router } from "express";

import { validate } from "../../application/middleware/validation.middleware";
import { lessonSchema } from "../schema/lesson.schema";
import { LessonController } from "../controller/lesson.controller";
import { roleGuard } from "../../../infrastructure";
import { UserRoles } from "../../user";
import { asyncHandler } from "../../auth";

export const lessonRouter = Router();

lessonRouter.post(
  "/",
  roleGuard(UserRoles.teacher),
  validate(lessonSchema),
  asyncHandler(LessonController.create),
);

lessonRouter.get("/", asyncHandler(LessonController.getAll));

lessonRouter.get("/:id", asyncHandler(LessonController.getById));

lessonRouter.put(
  "/:id",
  roleGuard(UserRoles.teacher),
  validate(lessonSchema),
  asyncHandler(LessonController.update),
);

lessonRouter.delete(
  "/:id",
  roleGuard(UserRoles.admin, UserRoles.teacher),
  asyncHandler(LessonController.delete),
);
