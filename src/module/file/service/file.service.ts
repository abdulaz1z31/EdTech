import { In } from "typeorm";
import { FileEntity } from "../entity/file.entity";
import { IFile } from "../interface/file.interface";
import { AppDataSource } from "../../../infrastructure";

export const FileService = {
  async uploadFiles(dto: IFile, files: Express.Multer.File[]) {
    const fileRepository = AppDataSource.getRepository(FileEntity);
    const savedFiles = await Promise.all(
      files.map(async (file) => {
        return await fileRepository.save({
          ...dto,
          url: file.filename,
        });
      }),
    );
    return savedFiles;
  },

  async deleteFiles(fileIds: string[]) {
    const fileRepository = AppDataSource.getRepository(FileEntity);
    await fileRepository.delete({ id: In(fileIds) });
  },

  async deleteByLesson(lesson_id: string) {
    const fileRepository = AppDataSource.getRepository(FileEntity);
    await fileRepository.delete({ lesson_id });
  },
};
