import { AppDataSource } from "../../../infrastructure";
import { Enrollment } from "../entity/enrollment.entity";
import { IEnrollmentDto } from "../interface/enrollment.interface";

const enrollmentRepository = AppDataSource.getRepository(Enrollment);

export const EnrollmentService = {
  async create(dto: IEnrollmentDto, student_id: string) {
    return await enrollmentRepository.save({ ...dto, student_id });
  },

  async getAll() {
    return await enrollmentRepository.find();
  },

  async getAllWithStudent(student_id: string) {
    return await enrollmentRepository.find({ where: { student_id } });
  },

  async getAllWithCourse(course_id: string) {
    return await enrollmentRepository.find({ where: { course_id } });
  },

  async getById(id: string) {
    const enrollment = await enrollmentRepository.findOne({ where: { id } });
    if (!enrollment) {
      throw new Error("Enrollment not found");
    }
    return enrollment;
  },

  async update(id: string, dto: Partial<IEnrollmentDto>) {
    const enrollment = await enrollmentRepository.findOne({ where: { id } });
    if (!enrollment) {
      throw new Error("Enrollment not found");
    }
    Object.assign(enrollment, dto);
    return await enrollmentRepository.save(enrollment);
  },

  async delete(id: string) {
    const enrollment = await enrollmentRepository.findOne({ where: { id } });
    if (!enrollment) {
      throw new Error("Enrollment not found");
    }
    return await enrollmentRepository.remove(enrollment);
  },
};
