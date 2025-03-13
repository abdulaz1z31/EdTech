import { AppDataSource } from "../../../infrastructure";
import { UserService } from "../../user";
import { Payment } from "../entity/payment.entity";
import { IPaymentDto } from "../interface/payment.interface";
import { CourseService } from "../../course/service/course.service";

export const PaymentService = {
  async create(dto: IPaymentDto, student_id: string) {
    const paymentRepository = AppDataSource.getRepository(Payment);
    await UserService.paymentFrom(student_id, dto.amount);
    const course = await CourseService.getById(dto.course_id);
    await UserService.paymentTo(course.teacher_id, dto.amount);
    return await paymentRepository.save({ ...dto, student_id });
  },

  async getAll() {
    const paymentRepository = AppDataSource.getRepository(Payment);
    return await paymentRepository.find({ relations: ["student", "course"] });
  },

  async getById(id: string) {
    const paymentRepository = AppDataSource.getRepository(Payment);
    const payment = await paymentRepository.findOne({
      where: { id },
      relations: ["student", "course"],
    });
    if (!payment) {
      throw new Error("Payment not found");
    }
    return payment;
  },

  async getByStudent(student_id: string) {
    const paymentRepository = AppDataSource.getRepository(Payment);
    return await paymentRepository.find({
      where: { student_id },
      relations: ["course"],
    });
  },

  async update(id: string, dto: Partial<IPaymentDto>) {
    const paymentRepository = AppDataSource.getRepository(Payment);
    const payment = await paymentRepository.findOne({ where: { id } });
    if (!payment) {
      throw new Error("Payment not found");
    }
    Object.assign(payment, dto);
    return await paymentRepository.save(payment);
  },

  async delete(id: string) {
    const paymentRepository = AppDataSource.getRepository(Payment);
    const payment = await paymentRepository.findOne({ where: { id } });
    if (!payment) {
      throw new Error("Payment not found");
    }
    return await paymentRepository.remove(payment);
  },
};
