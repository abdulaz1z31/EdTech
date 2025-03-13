export enum FileType {
  homework = "HOMEWORK",
  content = "CONTENT",
}

export interface IFile {
  file_type: FileType;
  lesson_id: string;
}
