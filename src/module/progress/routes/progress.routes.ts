import { Router } from "express";
import { ProgressController } from "../controller/progress.controller";
import { authGuard, roleGuard } from "../../../infrastructure";
import { UserRoles } from "../../user";

export const progressRouter = Router();

progressRouter.post(
  "/",
  roleGuard(UserRoles.student),
  ProgressController.create,
);
progressRouter.get("/", ProgressController.getAll);
progressRouter.get("/:id", ProgressController.getById);
progressRouter.delete("/:id", ProgressController.delete);
