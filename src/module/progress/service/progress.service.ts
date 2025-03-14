import { AppDataSource } from "../../../infrastructure";
import { Progress } from "../entity/progress.entity";
import { IProgressDto } from "../interface/progress.interface";

export const ProgressService = {
  async create(dto: IProgressDto, student_id: string) {
    const progressRepository = AppDataSource.getRepository(Progress);
    return await progressRepository.save({ ...dto, student_id });
  },

  async getAll() {
    const progressRepository = AppDataSource.getRepository(Progress);
    return await progressRepository.find();
  },

  async getById(id: string) {
    const progressRepository = AppDataSource.getRepository(Progress);
    const progress = await progressRepository.findOne({ where: { id } });
    if (!progress) {
      throw new Error("Progress not found");
    }
    return progress;
  },

  async getProgressByStudentId(studentId: string) {
    const progressRepository = AppDataSource.getRepository(Progress);

    const progressData = await progressRepository
      .createQueryBuilder("progress")
      .leftJoin("progress.student", "student")
      .leftJoin("progress.lesson", "lesson") 
      .leftJoin("lesson.course", "course") 
      .leftJoin("course.lessons", "allLessons")
      .select([
        "course.id AS courseId",
        "course.name AS courseName",
        "COUNT(DISTINCT allLessons.id) AS totalLessons",
        "COUNT(DISTINCT CASE WHEN progress.status = 'COMPLETED' THEN lesson.id END) AS completedLessons",
        "COALESCE(ROUND((COUNT(DISTINCT CASE WHEN progress.status = 'COMPLETED' THEN lesson.id END) * 100.0) / NULLIF(COUNT(DISTINCT allLessons.id), 0), 2), 0) AS completionPercentage",
      ])
      .where("student.id = :studentId", { studentId })
      .groupBy("course.id")
      .getRawMany();

    return progressData;
  },
  async update(id: string, dto: Partial<IProgressDto>) {
    const progressRepository = AppDataSource.getRepository(Progress);
    const progress = await progressRepository.findOne({ where: { id } });
    if (!progress) {
      throw new Error("Progress not found");
    }
    Object.assign(progress, dto);
    return await progressRepository.save(progress);
  },

  async delete(id: string) {
    const progressRepository = AppDataSource.getRepository(Progress);
    const progress = await progressRepository.findOne({ where: { id } });
    if (!progress) {
      throw new Error("Progress not found");
    }
    return await progressRepository.remove(progress);
  },
};
