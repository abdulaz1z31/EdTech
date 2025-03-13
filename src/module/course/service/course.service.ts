import { AppDataSource } from "../../../infrastructure";
import { Course } from "../entity/course.entity";
import { ICourseDto } from "../interface/course.interface";

export const CourseService = {
  async create(dto: ICourseDto) {
    const courseRepository = AppDataSource.getRepository(Course);
    return await courseRepository.save(dto);
  },

  async getAllCourses() {
    const courseRepository = AppDataSource.getRepository(Course);
    return await courseRepository
      .createQueryBuilder("course")
      .leftJoinAndSelect("course.ratings", "rating")
      .addSelect("COALESCE(AVG(rating.rating), 0)", "averageRating")
      .groupBy("course.id")
      .getRawMany();
  },

  async getById(id: string) {
    const courseRepository = AppDataSource.getRepository(Course);
    const course = await courseRepository.findOne({ where: { id } });
    if (!course) {
      throw new Error("Course not found");
    }
    return course;
  },

  async getByTeacher(teacher_id: string) {
    const courseRepository = AppDataSource.getRepository(Course);
    const courses = await courseRepository.find({ where: { teacher_id } });
    return courses;
  },

  async update(id: string, dto: Partial<ICourseDto>) {
    const courseRepository = AppDataSource.getRepository(Course);
    const course = await courseRepository.findOne({ where: { id } });
    if (!course) {
      throw new Error("Course not found");
    }
    Object.assign(course, dto);
    return await courseRepository.save(course);
  },

  async delete(id: string) {
    const courseRepository = AppDataSource.getRepository(Course);
    const course = await courseRepository.findOne({ where: { id } });
    if (!course) {
      throw new Error("Course not found");
    }
    return await courseRepository.remove(course);
  },
};
