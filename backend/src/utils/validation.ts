import Joi from "joi";

export const customerIdSchema = Joi.object({
  id: Joi.string().min(1).required(),
});
