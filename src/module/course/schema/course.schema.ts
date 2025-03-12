import Joi from "joi";

export const courseSchema = Joi.object({
  name: Joi.string().max(255).required(),
  description: Joi.string().optional(),
  teacher_id: Joi.string().uuid().required(),
  price: Joi.number().min(0).required(),
});
