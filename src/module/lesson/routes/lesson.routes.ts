import { Router } from "express";

import { validate } from "../../application/middleware/validation.middleware";
import { lessonSchema } from "../schema/lesson.schema";
import { LessonController } from "../controller/lesson.controller";
import {
  authGuard,
  roleGuard,
  UploadService,
} from "../../../infrastructure";
import { UserRoles } from "../../user";
import { asyncHandler } from "../../auth";

export const lessonRouter = Router();

lessonRouter.post(
  "/",
  UploadService.uploadFilesAndVideos,
  authGuard,
  roleGuard(UserRoles.teacher),
  validate(lessonSchema),
  asyncHandler(LessonController.create),
);

lessonRouter.get("/", asyncHandler(LessonController.getAll));

lessonRouter.get("/:id", asyncHandler(LessonController.getById));

lessonRouter.put(
  "/:id",
  authGuard,
  roleGuard(UserRoles.teacher),
  validate(lessonSchema),
  asyncHandler(LessonController.update),
);

lessonRouter.delete(
  "/:id",
  authGuard,
  roleGuard(UserRoles.admin, UserRoles.teacher),
  asyncHandler(LessonController.delete),
);
