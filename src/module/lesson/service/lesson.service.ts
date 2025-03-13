import { AppDataSource } from "../../../infrastructure";
import { Lesson } from "../entity/lesson.entity";
import { LessonDTO } from "../interface/lesson.interface";

const lessonRepository = AppDataSource.getRepository(Lesson);
export const LessonService = {
  async create(data: LessonDTO) {
    const lesson = lessonRepository.create(data);
    return await lessonRepository.save(lesson);
  },
  async getAll() {
    return await lessonRepository.find();
  },
  async getById(id: string) {
    return await lessonRepository.findOne({ where: { id } });
  },
  async update(id: string, data: LessonDTO) {
    await lessonRepository.update(id, data);
    return await this.getById(id);
  },
  async delete(id: string) {
    await lessonRepository.delete(id);
  },
};
