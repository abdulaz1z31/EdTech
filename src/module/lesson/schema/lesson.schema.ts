import Joi from "joi";

export const lessonSchema = Joi.object({
  title: Joi.string().max(255).required(),
  course_id: Joi.string().uuid().required(),
  number: Joi.number().integer().positive().required(),
  content: Joi.string().max(500).required(),
  homework: Joi.string().max(500).required(),
});
