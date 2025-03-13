import { Router } from "express";
import { RatingController } from "../controller/rating.controller";
import { validate } from "../../application/middleware/validation.middleware";
import { authGuard } from "../../../infrastructure";
import { asyncHandler } from "../../auth";
import { ratingSchema } from "../schema/raiting.schema";

export const ratingRouter = Router();

ratingRouter.post(
  "/",
  authGuard,
  validate(ratingSchema),
  asyncHandler(RatingController.create),
);

ratingRouter.get("/:id", asyncHandler(RatingController.getByCourse));

ratingRouter.get("/rating/:id", asyncHandler(RatingController.getById));

ratingRouter.put(
  "/:id",
  authGuard,
  validate(ratingSchema),
  asyncHandler(RatingController.update),
);

ratingRouter.delete("/:id", authGuard, asyncHandler(RatingController.delete));
