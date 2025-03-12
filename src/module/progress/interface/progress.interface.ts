export enum ProgressStatus {
  NOT_STARTED = "NOT_STARTED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

export interface IProgressDto {
  user_id: string;
  course_id: string;
  lesson_id: string;
  status: ProgressStatus;
}
