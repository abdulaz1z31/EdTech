import { Request, Response, NextFunction } from "express";
import { RatingService } from "../service/rating.service";

export const RatingController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const rating = await RatingService.create(req.body, req.user.id);
      res.status(201).json(rating);
    } catch (error) {
      next(error);
    }
  },

  async getByCourse(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const ratings = await RatingService.getByCourse(id);
      res.status(200).json(ratings);
    } catch (error) {
      next(error);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const rating = await RatingService.getById(req.params.id);
      if (!rating) {
        res.status(404).json({ message: "Rating not found" });
      }
      res.status(200).json(rating);
    } catch (error) {
      next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const rating = await RatingService.update(req.params.id, req.body);
      res.status(200).json(rating);
    } catch (error) {
      next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await RatingService.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
};
