import Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().required(),
  PORT: Joi.number().required(),
  FRONTEND_URL: Joi.string().required(),
  DATABASE_URL: Joi.string().required(),
  INVITATION_JWT_SECRET: Joi.string().required(),
  EMAIL_HOST: Joi.string().required(),
  EMAIL_PORT: Joi.number().required(),
  EMAIL_SECURE: Joi.bool().required(),
  EMAIL_USER: Joi.string().required(),
  EMAIL_PASSWORD: Joi.string().required(),
  BUCKET_NAME: Joi.string().required(),
  BUCKET_SECRET_KEY: Joi.string().required(),
  BUCKET_ACCESS_KEY: Joi.string().required(),
  BUCKET_REGION: Joi.string().required(),
  REDIS_URL: Joi.string().required(),
  MAX_FILE_SIZE: Joi.number().required(),
  MAX_FILES: Joi.number().required(),
  AUTH_UUID: Joi.string().uuid({ version: 'uuidv4' }).required(),
  COURSE_UUID: Joi.string().uuid({ version: 'uuidv4' }).required(),
});
