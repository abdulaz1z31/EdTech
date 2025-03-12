export enum EnrollmentStatus {
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
  CANCELED = "CANCELED",
}

export interface IEnrollmentDto {
  student_id: string;
  course_id: string;
  status: EnrollmentStatus;
}
