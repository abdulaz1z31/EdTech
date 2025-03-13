import { AppDataSource, HashService as hashService } from "../../../infrastructure";
import { IUser } from "../constants/user.constants";
import { User } from "../entity/user.entity";

export const UserService = {
  async create(dto: IUser) {
    const userRepository = AppDataSource.getRepository(User); 
    const hashPassword = await hashService.generate(dto.password);
    dto.password = hashPassword;
    dto.created_at = new Date(Date.now());
    const user = await userRepository.save(dto);
    return user;
  },

  async findById(id: string) {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ id });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  },

  async findByEmail(email: string) {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ email });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  },

  async update(id: string, dto: Partial<IUser>) {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ id });
    if (!user) {
      throw new Error("User not found");
    }

    if (dto.password) {
      dto.password = await hashService.generate(dto.password);
    }
    dto.updated_at = new Date(Date.now());

    await userRepository.update(id, dto);
    return { ...user, ...dto };
  },

  async delete(id: string) {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ id });
    if (!user) {
      throw new Error("User not found");
    }

    await userRepository.delete(id);
    return id;
  },

  async getAll() {
    const userRepository = AppDataSource.getRepository(User);
    return await userRepository.find();
  },

  async existsEmail(email: string) {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ email });
    return !!user;
  },
};