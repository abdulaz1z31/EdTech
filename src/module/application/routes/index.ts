import { Router } from "express";
import { authRouter } from "../../auth";
import { courseRouter } from "../../course";
import { lessonRouter } from "../../lesson";
import { progressRouter } from "../../progress";
import { enrollmentRouter } from "../../enrollment";
import { authGuard } from "../../../infrastructure";
export const appRouter = Router();

appRouter.use("/auth", authRouter);
appRouter.use("/course", authGuard, courseRouter);
appRouter.use("/lesson", lessonRouter);
appRouter.use("/enrollment", authGuard, enrollmentRouter);
appRouter.use("/progress", progressRouter);
