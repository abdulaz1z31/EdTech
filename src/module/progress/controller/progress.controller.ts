import { Request, Response } from "express";
import { ProgressService } from "../service/progress.service";

export const ProgressController = {
  async create(req: Request, res: Response) {
    const progress = await ProgressService.create(req.body);
    res.status(201).json(progress);
  },

  async getAll(req: Request, res: Response) {
    const progressList = await ProgressService.getAll();
    res.json(progressList);
  },

  async getById(req: Request, res: Response) {
    const progress = await ProgressService.getById(req.params.id);
    res.json(progress);
  },

  async update(req: Request, res: Response) {
    const updatedProgress = await ProgressService.update(req.params.id, req.body);
    res.json(updatedProgress);
  },

  async delete(req: Request, res: Response) {
    await ProgressService.delete(req.params.id);
    res.status(204).send();
  },
};
