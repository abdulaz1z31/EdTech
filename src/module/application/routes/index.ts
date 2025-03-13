import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
  Router,
} from "express";
import { authRouter } from "../../auth";
import { courseRouter } from "../../course";
import { lessonRouter } from "../../lesson";
import { progressRouter } from "../../progress";
import { enrollmentRouter } from "../../enrollment";
export const appRouter = Router();

appRouter.use("/auth", authRouter);
appRouter.use("/course", courseRouter);
appRouter.use("/lesson", lessonRouter);
appRouter.use("/enrollment", enrollmentRouter);
appRouter.use("/progress", progressRouter);
