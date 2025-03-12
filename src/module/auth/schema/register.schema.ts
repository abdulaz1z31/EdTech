import Joi from "joi";
import { UserRoles } from "../../user";


export const registerSchema = Joi.object({
  full_name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string()
    .valid(...Object.values(UserRoles))
    .required(),
});


// export const registerSchema = Joi.object({
//   full_name: Joi.string().min(3).max(50).required(),
//   email: Joi.string().email().required(),
//   password: Joi.string()
//     .min(8) // Minimum 8 belgi
//     .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/)
//     .required()
//     .messages({
//       "string.pattern.base":
//         "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)",
//       "string.min": "Password must be at least 8 characters long",
//       "any.required": "Password is required",
//     }),
//   role: Joi.string()
//     .valid(...Object.values(UserRoles))
//     .required(),
// });