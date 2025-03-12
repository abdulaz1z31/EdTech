import { Request, Response } from "express";
import { LessonDTO } from "../interface/lesson.interface";
import { LessonService } from "../service/lesson.service";

export class LessonController {
  static async create(req: Request, res: Response) {
    const lesson: LessonDTO = req.body;
    const newLesson = await LessonService.create(lesson);
    res.status(201).json(newLesson);
  }

  static async getAll(req: Request, res: Response) {
    const lessons = await LessonService.getAll();
    res.json(lessons);
  }

  static async getById(req: Request, res: Response) {
    const { id } = req.params;
    const lesson = await LessonService.getById(id);
    if (!lesson) return res.status(404).json({ message: "Lesson not found" });
    res.json(lesson);
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const lessonData: LessonDTO = req.body;
    const updatedLesson = await LessonService.update(id, lessonData);
    res.json(updatedLesson);
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    await LessonService.delete(id);
    res.status(204).send();
  }
}
