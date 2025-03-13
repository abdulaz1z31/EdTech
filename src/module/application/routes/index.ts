import { Request, Response, Router } from "express";
import { authRouter } from "../../auth";
import { courseRouter } from "../../course";
import { lessonRouter } from "../../lesson";
import { progressRouter } from "../../progress";
import { enrollmentRouter } from "../../enrollment";
import { authGuard } from "../../../infrastructure";
import { ratingRouter } from "../../raiting";
import { paymentRouter } from "../../payment";
export const appRouter = Router();

appRouter.use("/auth", authRouter);
appRouter.use("/course", authGuard, courseRouter);
appRouter.use("/lesson", lessonRouter);
appRouter.use("/enrollment", authGuard, enrollmentRouter);
appRouter.use("/progress", authGuard, progressRouter);
appRouter.use("/rating", ratingRouter);
appRouter.use("/payment", paymentRouter);

appRouter.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Not found" });
});
