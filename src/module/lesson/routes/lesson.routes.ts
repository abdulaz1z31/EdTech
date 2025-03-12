import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
  Router,
} from "express";
import "express-async-errors";
import { validate } from "../../application/middleware/validation.middleware";
import { lessonSchema } from "../schema/lesson.schema";
import { LessonController } from "../controller/lesson.controller";
import { roleGuard } from "../../../infrastructure";
import { UserRoles } from "../../user";

const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>,
): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

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
  roleGuard(UserRoles.admin),
  asyncHandler(LessonController.delete),
);
