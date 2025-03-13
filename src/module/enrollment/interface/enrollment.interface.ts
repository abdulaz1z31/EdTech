export enum EnrollmentStatus {
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
  CANCELED = "CANCELED",
}

export interface IEnrollmentDto {
  course_id: string;
  status: EnrollmentStatus;
}
