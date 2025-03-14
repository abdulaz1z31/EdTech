import { Router } from "express";

import { validate } from "../../application/middleware/validation.middleware";
import { lessonSchema } from "../schema/lesson.schema";
import { LessonController } from "../controller/lesson.controller";
import { roleGuard } from "../../../infrastructure/guard/role.guard";
import { authGuard } from "../../../infrastructure/jwt/auth.guard";
import { UploadService } from "../../../infrastructure/multer/upload.service";
import { UserRoles } from "../../user";

export const lessonRouter = Router();

lessonRouter.post(
  "/",
  UploadService.uploadFilesAndVideos,
  authGuard,
  roleGuard(UserRoles.teacher),
  validate(lessonSchema),
  LessonController.create,
);

lessonRouter.get("/", LessonController.getAll);

lessonRouter.get("/:id", LessonController.getById);

lessonRouter.put(
  "/:id",
  authGuard,
  roleGuard(UserRoles.teacher),
  validate(lessonSchema),
  LessonController.update,
);

lessonRouter.delete(
  "/:id",
  authGuard,
  roleGuard(UserRoles.admin, UserRoles.teacher),
  LessonController.delete,
);
