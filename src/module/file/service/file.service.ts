import { In } from "typeorm";
import { FileEntity } from "../entity/file.entity";
import { IFile } from "../interface/file.interface";
import { AppDataSource } from "../../../infrastructure";

const fileRepository = AppDataSource.getRepository(FileEntity);

export const FileService = {
  async uploadFiles(dto: IFile, files: Express.Multer.File[]) {
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
    await fileRepository.delete({ id: In(fileIds) });
  },

  async deleteByLesson(lesson_id: string) {
    await fileRepository.delete({ lesson_id });
  },
};
