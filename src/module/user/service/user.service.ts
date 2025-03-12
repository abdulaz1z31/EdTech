import {
  AppDataSource as db,
  HashService as hashService,
} from "../../../infrastructure";
import { IUser } from "../constants/user.constants";
import { User } from "../entity/user.entity";

export const UserService = {
  async create(dto: IUser) {
    const hashPassword = await hashService.generate(dto.password);
    dto.password = hashPassword;
    dto.created_at = new Date(Date.now());
    const user = await db.getRepository(User).save(dto);
    return user;
  },

  async findById(id: string) {
    const user = await db.getRepository(User).findOneBy({ id });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  },

  async findByEmail(email: string) {
    const user = await db.getRepository(User).findOneBy({ email });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  },

  async update(id: string, dto: Partial<IUser>) {
    const user = await db.getRepository(User).findOneBy({ id });
    if (!user) {
      throw new Error("User not found");
    }

    if (dto.password) {
      dto.password = await hashService.generate(dto.password);
    }
    dto.updated_at = new Date(Date.now());

    await db.getRepository(User).update(id, dto);
    return { ...user, ...dto };
  },

  async delete(id: string) {
    const user = await db.getRepository(User).findOneBy({ id });
    if (!user) {
      throw new Error("User not found");
    }

    await db.getRepository(User).delete(id);
    return id
  },

  async getAll() {
    return await db.getRepository(User).find();
  },

  async existsEmail(email: string) {
    const user = await db.getRepository(User).findOneBy({ email });
    return !!user
  },
};
