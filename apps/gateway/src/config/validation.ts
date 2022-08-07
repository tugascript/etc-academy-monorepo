import Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().required(),
  PORT: Joi.number().required(),
  USERS_URL: Joi.string().required(),
  COURSES_URL: Joi.string().required(),
  REDIS_URL: Joi.string().required(),
  MAX_FILE_SIZE: Joi.number().required(),
  MAX_FILES: Joi.number().required(),
});
