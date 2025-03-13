import { NextFunction, Request, Response } from "express";
import { ProgressService } from "../service/progress.service";

export const ProgressController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const progress = await ProgressService.create(req.body);
      res.status(201).json(progress);
    } catch (error) {
      next(error);
    }
  },

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const progressList = await ProgressService.getAll();
      res.json(progressList);
    } catch (error) {
      next(error);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const progress = await ProgressService.getById(req.params.id);
      res.json(progress);
    } catch (error) {
      next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedProgress = await ProgressService.update(
        req.params.id,
        req.body,
      );
      res.json(updatedProgress);
    } catch (error) {
      next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await ProgressService.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
};
