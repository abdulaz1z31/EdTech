import bcrypt from "bcrypt";
const SALT_ROUNDS = 10;
export const HashService = {
  async generate(password: string): Promise<string> {
    return await bcrypt.hash(password, SALT_ROUNDS);
  },
  async compare(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  },
};
