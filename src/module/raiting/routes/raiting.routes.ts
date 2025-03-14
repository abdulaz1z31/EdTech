import { Router } from "express";
import { RatingController } from "../controller/rating.controller";
import { validate } from "../../application/middleware/validation.middleware";
import { authGuard } from "../../../infrastructure/jwt/auth.guard";
import { ratingSchema } from "../schema/raiting.schema";
import { roleGuard } from "../../../infrastructure/guard/role.guard";
import { UserRoles } from "../../user";

export const ratingRouter = Router();

ratingRouter.post(
  "/",
  authGuard,
  roleGuard(UserRoles.student),
  validate(ratingSchema),
  RatingController.create,
);

ratingRouter.get("/:id", RatingController.getByCourse);

ratingRouter.get("/rating/:id", RatingController.getById);

ratingRouter.put(
  "/:id",
  authGuard,
  roleGuard(UserRoles.student),
  validate(ratingSchema),
  RatingController.update,
);

ratingRouter.delete(
  "/:id",
  authGuard,
  roleGuard(UserRoles.student, UserRoles.admin),
  RatingController.delete,
);
