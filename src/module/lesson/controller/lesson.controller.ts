import { NextFunction, Request, Response } from "express";
import { LessonDTO } from "../interface/lesson.interface";
import { LessonService } from "../service/lesson.service";

export const LessonController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const lesson: LessonDTO = req.body;
      const homeworks = req.files["homeworks"] || [];
      const contents = req.files["contents"] || [];
      const newLesson = await LessonService.create(lesson, homeworks, contents);
      res.status(201).json(newLesson);
    } catch (error) {
      next(error);
    }
  },
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const lessons = await LessonService.getAll();
      res.json(lessons);
    } catch (error) {
      next(error);
    }
  },
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const lesson = await LessonService.getById(id);
      if (!lesson) return res.status(404).json({ message: "Lesson not found" });
      res.json(lesson);
    } catch (error) {
      next(error);
    }
  },
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const lessonData: LessonDTO = req.body;
      const updatedLesson = await LessonService.update(id, lessonData);
      res.json(updatedLesson);
    } catch (error) {
      next(error);
    }
  },
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await LessonService.delete(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
};
