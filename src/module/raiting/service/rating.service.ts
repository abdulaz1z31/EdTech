import { AppDataSource } from "../../../infrastructure";
import { Rating } from "../entity/raiting.entity";
import { IRatingDto } from "../interface/raiting.interface";

export const RatingService = {
  async create(dto: IRatingDto, student_id: string) {
    const ratingRepository = AppDataSource.getRepository(Rating);
    return await ratingRepository.save({ ...dto, student_id });
  },

  async getByCourse(courseId: string) {
    const ratingRepository = AppDataSource.getRepository(Rating);
    return await ratingRepository.find({ where: { course_id: courseId } });
  },

  async getById(id: string) {
    const ratingRepository = AppDataSource.getRepository(Rating);
    const rating = await ratingRepository.findOne({ where: { id } });
    if (!rating) {
      throw new Error("Rating not found");
    }
    return rating;
  },

  async update(id: string, dto: Partial<IRatingDto>) {
    const ratingRepository = AppDataSource.getRepository(Rating);
    const rating = await ratingRepository.findOne({ where: { id } });
    if (!rating) {
      throw new Error("Rating not found");
    }
    Object.assign(rating, dto);
    return await ratingRepository.save(rating);
  },

  async delete(id: string) {
    const ratingRepository = AppDataSource.getRepository(Rating);
    const rating = await ratingRepository.findOne({ where: { id } });
    if (!rating) {
      throw new Error("Rating not found");
    }
    return await ratingRepository.remove(rating);
  },
};
