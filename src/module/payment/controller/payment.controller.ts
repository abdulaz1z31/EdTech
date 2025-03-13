import { Request, Response, NextFunction } from "express";
import { PaymentService } from "../service/payment.service";

export const PaymentController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const payment = await PaymentService.create(req.body, req.user.id);
      res.status(201).json(payment);
    } catch (error) {
      next(error);
    }
  },

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const payments = await PaymentService.getAll();
      res.status(200).json(payments);
    } catch (error) {
      next(error);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const payment = await PaymentService.getById(req.params.id);
      if (!payment) {
        res.status(404).json({ message: "Payment not found" });
      }
      res.status(200).json(payment);
    } catch (error) {
      next(error);
    }
  },

  async getByStudent(req: Request, res: Response, next: NextFunction) {
    try {
      const student_id = req.user.id;
      const payments = await PaymentService.getByStudent(student_id);
      res.status(200).json(payments);
    } catch (error) {
      next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const payment = await PaymentService.update(req.params.id, req.body);
      res.status(200).json(payment);
    } catch (error) {
      next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await PaymentService.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
};
