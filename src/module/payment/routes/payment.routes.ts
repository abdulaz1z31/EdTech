import { Router } from "express";
import { PaymentController } from "../controller/payment.controller";
import { paymentSchema } from "../schema/payment.schema";
import { validate } from "../../application/middleware/validation.middleware";
import { roleGuard } from "../../../infrastructure/guard/role.guard";
import { authGuard } from "../../../infrastructure/jwt/auth.guard";
import { UserRoles } from "../../user";
import {} from "../../auth";

export const paymentRouter = Router();

paymentRouter.post(
  "/",
  authGuard,
  roleGuard(UserRoles.student),
  validate(paymentSchema),
  PaymentController.create,
);

paymentRouter.get("/", authGuard, PaymentController.getAll);

paymentRouter.get("/me", authGuard, PaymentController.getByStudent);

paymentRouter.get("/:id", authGuard, PaymentController.getById);

paymentRouter.put(
  "/:id",
  authGuard,
  roleGuard(UserRoles.admin),
  validate(paymentSchema),
  PaymentController.update,
);

paymentRouter.delete(
  "/:id",
  authGuard,
  roleGuard(UserRoles.admin),
  PaymentController.delete,
);
