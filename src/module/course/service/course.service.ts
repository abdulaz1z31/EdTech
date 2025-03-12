import { AppDataSource } from "../../../infrastructure";
import { Course } from "../entity/course.entity";
import { ICourseDto } from "../interface/course.interface";

const courseRepository = AppDataSource.getRepository(Course);

export const CourseService = {
  async create(dto: ICourseDto) {
    return await courseRepository.save(dto);
  },

  async getAll() {
    return await courseRepository.find();
  },

  async getById(id: string) {
    const course = await courseRepository.findOne({ where: { id } });
    if (!course) {
      throw new Error("Course not found");
    }
    return course;
  },

  async update(id: string, dto: Partial<ICourseDto>) {
    const course = await courseRepository.findOne({ where: { id } });
    if (!course) {
      throw new Error("Course not found");
    }
    Object.assign(course, dto);
    return await courseRepository.save(course);
  },

  async delete(id: string) {
    const course = await courseRepository.findOne({ where: { id } });
    if (!course) {
      throw new Error("Course not found");
    }
    return await courseRepository.remove(course);
  },
};
