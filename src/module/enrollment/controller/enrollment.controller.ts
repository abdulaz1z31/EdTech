import { NextFunction, Request, Response } from "express";
import { EnrollmentService } from "../service/enrollment.service";

export const EnrollmentController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const enrollment = await EnrollmentService.create(req.body);
      res.status(201).json(enrollment);
    } catch (error) {
      next(error);
    }
  },

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const enrollments = await EnrollmentService.getAll();
      res.json(enrollments);
    } catch (error) {
      next(error);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const enrollment = await EnrollmentService.getById(req.params.id);
      res.json(enrollment);
    } catch (error) {
      next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await EnrollmentService.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
};
