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
    USERS_URL: joi_1.default.string().required(),
    COURSES_URL: joi_1.default.string().required(),
    REDIS_URL: joi_1.default.string().required(),
    MAX_FILE_SIZE: joi_1.default.number().required(),
    MAX_FILES: joi_1.default.number().required(),
});
//# sourceMappingURL=validation.js.map