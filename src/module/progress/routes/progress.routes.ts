import { Router } from "express";
import { ProgressController } from "../controller/progress.controller";
import { progressSchema } from "../schema/progress.schema";
import { validate } from "../../application/middleware/validation.middleware";
import "express-async-errors";

export const progressRouter = Router();

progressRouter.post("/", validate(progressSchema), ProgressController.create);
progressRouter.get("/", ProgressController.getAll);
progressRouter.get("/:id", ProgressController.getById);
progressRouter.put("/:id", validate(progressSchema), ProgressController.update);
progressRouter.delete("/:id", ProgressController.delete);
