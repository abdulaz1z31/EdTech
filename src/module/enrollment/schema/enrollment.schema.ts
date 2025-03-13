import Joi from "joi";
import { EnrollmentStatus } from "../interface/enrollment.interface";

export const enrollmentSchema = Joi.object({
  course_id: Joi.string().uuid().required(),
  status: Joi.string()
    .valid(...Object.values(EnrollmentStatus))
    .required(),
});
