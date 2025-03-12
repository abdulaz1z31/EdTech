import { Router } from "express";
import { EnrollmentController } from "../controller/enrollment.controller";
import { enrollmentSchema } from "../schema/enrollment.schema";
import { validate } from "../../application/middleware/validation.middleware";
import "express-async-errors";

export const enrollmentRouter = Router();

// enrollmentRouter.post(
//   "/",
//   validate(enrollmentSchema),
//   EnrollmentController.create,
// );
enrollmentRouter.get("/", EnrollmentController.getAll);
enrollmentRouter.get("/:id", EnrollmentController.getById);
enrollmentRouter.put(
  "/:id",
  validate(enrollmentSchema),
  EnrollmentController.update,
);
enrollmentRouter.delete("/:id", EnrollmentController.delete);
