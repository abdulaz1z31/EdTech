import { Router } from "express";
import { ProgressController } from "../controller/progress.controller";
import { roleGuard } from "../../../infrastructure/guard/role.guard";
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
