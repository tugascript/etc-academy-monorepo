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
    JWT_ACCESS_TIME: joi_1.default.number().required(),
    JWT_CONFIRMATION_SECRET: joi_1.default.string().required(),
    JWT_CONFIRMATION_TIME: joi_1.default.number().required(),
    JWT_RESET_PASSWORD_SECRET: joi_1.default.string().required(),
    JWT_RESET_PASSWORD_TIME: joi_1.default.number().required(),
    JWT_REFRESH_SECRET: joi_1.default.string().required(),
    JWT_REFRESH_TIME: joi_1.default.number().required(),
    REFRESH_COOKIE: joi_1.default.string().required(),
    EMAIL_HOST: joi_1.default.string().required(),
    EMAIL_PORT: joi_1.default.number().required(),
    EMAIL_SECURE: joi_1.default.bool().required(),
    EMAIL_USER: joi_1.default.string().required(),
    EMAIL_PASSWORD: joi_1.default.string().required(),
    REDIS_URL: joi_1.default.string().required(),
    REDIS_CACHE_TTL: joi_1.default.number().required(),
    AUTH_UUID: joi_1.default.string().uuid({ version: 'uuidv4' }).required(),
    THROTTLE_TTL: joi_1.default.number().required(),
    THROTTLE_LIMIT: joi_1.default.number().required(),
});
//# sourceMappingURL=validation.js.map