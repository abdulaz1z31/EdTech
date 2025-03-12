import { Router } from "express";
import { authRouter } from "../../auth";
import { courseRouter } from "../../course";
import { lessonRouter } from "../../lesson";
export const appRouter = Router();

appRouter.use("/auth", authRouter);
appRouter.use("/course", courseRouter);
appRouter.use("/lesson", lessonRouter);
