import Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().required(),
  PORT: Joi.number().required(),
  DATABASE_URL: Joi.string().required(),
  BUCKET_NAME: Joi.string().required(),
  BUCKET_SECRET_KEY: Joi.string().required(),
  BUCKET_ACCESS_KEY: Joi.string().required(),
  BUCKET_REGION: Joi.string().required(),
  REDIS_URL: Joi.string().required(),
  MAX_FILE_SIZE: Joi.number().required(),
  MAX_FILES: Joi.number().required(),
  COURSE_UUID: Joi.string().required(),
});
