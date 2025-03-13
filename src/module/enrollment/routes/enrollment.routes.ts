import { Router } from "express";
import { EnrollmentController } from "../controller/enrollment.controller";
import { enrollmentSchema } from "../schema/enrollment.schema";
import { validate } from "../../application/middleware/validation.middleware";
import "express-async-errors";
import { roleGuard } from "../../../infrastructure";
import { UserRoles } from "../../user";

export const enrollmentRouter = Router();

enrollmentRouter.post(
  "/",
  roleGuard(UserRoles.student),
  validate(enrollmentSchema),
  EnrollmentController.create,
);
enrollmentRouter.get(
  "/",
  roleGuard(UserRoles.teacher, UserRoles.admin),
  EnrollmentController.getAll,
);

enrollmentRouter.get("/:id", EnrollmentController.getById);

enrollmentRouter.delete("/:id", EnrollmentController.delete);
