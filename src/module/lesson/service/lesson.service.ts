import { AppDataSource } from "../../../infrastructure";
import { FileType, IFile } from "../../file/interface/file.interface";
import { FileService } from "../../file/service/file.service";
import { Lesson } from "../entity/lesson.entity";
import { LessonDTO } from "../interface/lesson.interface";

const lessonRepository = AppDataSource.getRepository(Lesson);
export const LessonService = {
  async create(
    lesson: LessonDTO,
    homeworks: Express.Multer.File[],
    contents: Express.Multer.File[],
  ) {
    const newLesson = await lessonRepository.save(lesson);

    const homeworkDto: IFile = {
      lesson_id: newLesson.id,
      file_type: FileType.homework,
    };

    const contentDto: IFile = {
      lesson_id: newLesson.id,
      file_type: FileType.content,
    };
    const [homeworkFiles, contentFiles] = await Promise.all([
      FileService.uploadFiles(homeworkDto, homeworks),
      FileService.uploadFiles(contentDto, contents),
    ]);

    return { ...newLesson, homeworks: homeworkFiles, contents: contentFiles };
  },

  async getAll() {
    return await lessonRepository.find({
      relations: ["files"],
    });
  },
  async getById(id: string) {
    return await lessonRepository.findOne({
      where: { id },
      relations: ["files"],
    });
  },
  async update(id: string, data: LessonDTO) {
    await lessonRepository.update(id, data);
    return await this.getById(id);
  },
  async delete(id: string) {
    await Promise.all([
      lessonRepository.delete(id),
      FileService.deleteByLesson(id),
    ]);
  },
};
