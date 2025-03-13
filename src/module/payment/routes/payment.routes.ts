import { Router } from "express";
import { PaymentController } from "../controller/payment.controller";
import { paymentSchema } from "../schema/payment.schema";
import { validate } from "../../application/middleware/validation.middleware";
import { authGuard, roleGuard } from "../../../infrastructure";
import { UserRoles } from "../../user";
import { asyncHandler } from "../../auth";

export const paymentRouter = Router();

paymentRouter.post(
  "/",
  authGuard,
  roleGuard(UserRoles.student),
  validate(paymentSchema),
  asyncHandler(PaymentController.create),
);

paymentRouter.get("/", authGuard, asyncHandler(PaymentController.getAll));

paymentRouter.get(
  "/me",
  authGuard,
  asyncHandler(PaymentController.getByStudent),
);

paymentRouter.get("/:id", authGuard, asyncHandler(PaymentController.getById));

paymentRouter.put(
  "/:id",
  authGuard,
  roleGuard(UserRoles.admin),
  validate(paymentSchema),
  asyncHandler(PaymentController.update),
);

paymentRouter.delete(
  "/:id",
  authGuard,
  roleGuard(UserRoles.admin),
  asyncHandler(PaymentController.delete),
);
