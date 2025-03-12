import { AppDataSource } from "../../../infrastructure";
import { Lesson } from "../entity/lesson.entity";
import { LessonDTO } from "../interface/lesson.interface";

export class LessonService {
  private static lessonRepository = AppDataSource.getRepository(Lesson);

  static async create(data: LessonDTO) {
    const lesson = this.lessonRepository.create(data);
    return await this.lessonRepository.save(lesson);
  }

  static async getAll() {
    return await this.lessonRepository.find();
  }

  static async getById(id: string) {
    return await this.lessonRepository.findOne({ where: { id } });
  }

  static async update(id: string, data: LessonDTO) {
    await this.lessonRepository.update(id, data);
    return await this.getById(id);
  }

  static async delete(id: string) {
    await this.lessonRepository.delete(id);
  }
}
