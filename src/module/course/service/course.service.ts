import { AppDataSource } from "../../../infrastructure";
import { Course } from "../entity/course.entity";
import { ICourseDto } from "../interface/course.interface";

export const CourseService = {
  async create(dto: ICourseDto) {
    const courseRepository = AppDataSource.getRepository(Course);
    return await courseRepository.save(dto);
  },

  async getAllCoursesWithRating() {
    const courseRepository = AppDataSource.getRepository(Course);
    return await courseRepository
      .createQueryBuilder("course")
      .leftJoin("course.ratings", "rating")
      .select([
        "course.*",
        "COALESCE(AVG(rating.rating), 0) AS averageRating",
      ])
      .groupBy("course.id")
      .orderBy('averageRating', "DESC")
      .getRawMany();
  },

  async getAll() {
    const courseRepository = AppDataSource.getRepository(Course);
    return await courseRepository.find({relations: ['lessons']})
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
