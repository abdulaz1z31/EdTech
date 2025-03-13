import { Router } from "express";
import { EnrollmentController } from "../controller/enrollment.controller";
import { enrollmentSchema } from "../schema/enrollment.schema";
import { validate } from "../../application/middleware/validation.middleware";
import { roleGuard } from "../../../infrastructure/guard/role.guard";
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

enrollmentRouter.get(
  "/my",
  roleGuard(UserRoles.student),
  EnrollmentController.getWithStudent,
);

enrollmentRouter.get("/course/:id", EnrollmentController.getWithCourse);

enrollmentRouter.get("/:id", EnrollmentController.getById);

enrollmentRouter.delete("/:id", EnrollmentController.delete);
