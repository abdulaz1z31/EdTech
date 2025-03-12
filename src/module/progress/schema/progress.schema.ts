import Joi from "joi";
import { ProgressStatus } from "../interface/progress.interface";

export const progressSchema = Joi.object({
  user_id: Joi.string().uuid().required(),
  course_id: Joi.string().uuid().required(),
  lesson_id: Joi.string().uuid().required(),
  status: Joi.string()
    .valid(...Object.values(ProgressStatus))
    .required(),
});
