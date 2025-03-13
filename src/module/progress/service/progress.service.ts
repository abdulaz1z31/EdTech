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
