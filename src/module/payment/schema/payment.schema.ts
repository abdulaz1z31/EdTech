import Joi from "joi";

export const paymentSchema = Joi.object({
  course_id: Joi.string().uuid().required(),
  amount: Joi.number().precision(2).positive().required(),
  status: Joi.string().valid("PENDING", "COMPLETED", "FAILED").optional(),
});
