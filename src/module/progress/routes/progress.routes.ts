import { Router } from "express";
import { ProgressController } from "../controller/progress.controller";

export const progressRouter = Router();

progressRouter.get("/", ProgressController.getAll);
progressRouter.get("/:id", ProgressController.getById);
