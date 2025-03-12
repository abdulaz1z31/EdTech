import { Router } from "express";
import { authRouter } from "../../auth";
import { courseRouter } from "../../course";
export const appRouter = Router();

appRouter.use("/auth", authRouter);
appRouter.use("/course", courseRouter);
