import { Request, Response } from "express";
import { EnrollmentService } from "../service/enrollment.service";

export const EnrollmentController = {
  async create(req: Request, res: Response) {
    const enrollment = await EnrollmentService.create(req.body);
    res.status(201).json(enrollment);
  },

  async getAll(req: Request, res: Response) {
    const enrollments = await EnrollmentService.getAll();
    res.json(enrollments);
  },

  async getById(req: Request, res: Response) {
    const enrollment = await EnrollmentService.getById(req.params.id);
    res.json(enrollment);
  },

  async update(req: Request, res: Response) {
    const updatedEnrollment = await EnrollmentService.update(req.params.id, req.body);
    res.json(updatedEnrollment);
  },

  async delete(req: Request, res: Response) {
    await EnrollmentService.delete(req.params.id);
    res.status(204).send();
  },
};
