"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.validationSchema = joi_1.default.object({
    NODE_ENV: joi_1.default.string().required(),
    PORT: joi_1.default.number().required(),
    FRONTEND_URL: joi_1.default.string().required(),
    DATABASE_URL: joi_1.default.string().required(),
    INVITATION_JWT_SECRET: joi_1.default.string().required(),
    EMAIL_HOST: joi_1.default.string().required(),
    EMAIL_PORT: joi_1.default.number().required(),
    EMAIL_SECURE: joi_1.default.bool().required(),
    EMAIL_USER: joi_1.default.string().required(),
    EMAIL_PASSWORD: joi_1.default.string().required(),
    BUCKET_NAME: joi_1.default.string().required(),
    BUCKET_SECRET_KEY: joi_1.default.string().required(),
    BUCKET_ACCESS_KEY: joi_1.default.string().required(),
    BUCKET_REGION: joi_1.default.string().required(),
    REDIS_URL: joi_1.default.string().required(),
    MAX_FILE_SIZE: joi_1.default.number().required(),
    MAX_FILES: joi_1.default.number().required(),
    AUTH_UUID: joi_1.default.string().uuid({ version: 'uuidv4' }).required(),
    COURSE_UUID: joi_1.default.string().uuid({ version: 'uuidv4' }).required(),
});
//# sourceMappingURL=validation.js.map