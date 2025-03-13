import { Request, Response, NextFunction } from "express";
import { CourseService } from "../service/course.service";

export const CourseController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const course = await CourseService.create(req.body);
      return res.status(201).json(course);
    } catch (error) {
      next(error);
    }
  },

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const courses = await CourseService.getAllCourses();
      return res.status(200).json(courses);
    } catch (error) {
      next(error);
    }
  },

  async getMyCourses(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.user.id
      const courses = await CourseService.getByTeacher(id);      
      return res.status(200).json(courses);
    } catch (error) {
      next(error);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const course = await CourseService.getById(req.params.id);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      return res.status(200).json(course);
    } catch (error) {
      next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const course = await CourseService.update(req.params.id, req.body);
      return res.status(200).json(course);
    } catch (error) {
      next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await CourseService.delete(req.params.id);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
};
