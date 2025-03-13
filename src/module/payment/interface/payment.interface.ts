export enum PaymentStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

export interface IPaymentDto {
  course_id: string;
  amount: number;
  status?: PaymentStatus;
}