import Joi from "joi";

export const ratingSchema = Joi.object({
  course_id: Joi.string().uuid().required(),
  raiting: Joi.number().integer().min(1).max(5).required(),
  comment: Joi.string().optional(),
});
