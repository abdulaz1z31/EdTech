import { AppDataSource } from "../../../infrastructure";
import { Progress } from "../entity/progress.entity";
import { IProgressDto } from "../interface/progress.interface";

const progressRepository = AppDataSource.getRepository(Progress);

export const ProgressService = {
  async create(dto: IProgressDto, student_id: string) {
    return await progressRepository.save({ ...dto, student_id });
  },

  async getAll() {
    return await progressRepository.find();
  },

  async getById(id: string) {
    const progress = await progressRepository.findOne({ where: { id } });
    if (!progress) {
      throw new Error("Progress not found");
    }
    return progress;
  },

  async update(id: string, dto: Partial<IProgressDto>) {
    const progress = await progressRepository.findOne({ where: { id } });
    if (!progress) {
      throw new Error("Progress not found");
    }
    Object.assign(progress, dto);
    return await progressRepository.save(progress);
  },

  async delete(id: string) {
    const progress = await progressRepository.findOne({ where: { id } });
    if (!progress) {
      throw new Error("Progress not found");
    }
    return await progressRepository.remove(progress);
  },
};
