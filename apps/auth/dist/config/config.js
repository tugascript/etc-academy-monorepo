"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const utils_1 = require("../common/utils");
const keyPath = (0, path_1.join)(__dirname, '..', '..', 'jwt.key');
const key = (0, fs_1.readFileSync)(keyPath, 'utf8');
function config() {
    const testing = process.env.NODE_ENV !== 'production';
    return {
        port: parseInt(process.env.PORT, 10),
        redis: (0, utils_1.redisUrlToOptions)(process.env.REDIS_URL),
        jwt: {
            access: {
                secret: key,
                time: parseInt(process.env.JWT_ACCESS_TIME, 10),
            },
            confirmation: {
                secret: process.env.JWT_CONFIRMATION_SECRET,
                time: parseInt(process.env.JWT_CONFIRMATION_TIME, 10),
            },
            resetPassword: {
                secret: process.env.JWT_RESET_PASSWORD_SECRET,
                time: parseInt(process.env.JWT_RESET_PASSWORD_TIME, 10),
            },
            refresh: {
                secret: process.env.JWT_REFRESH_SECRET,
                time: parseInt(process.env.JWT_REFRESH_TIME, 10),
            },
        },
        email: {
            host: process.env.EMAIL_HOST,
            port: parseInt(process.env.EMAIL_PORT, 10),
            secure: Boolean(process.env.EMAIL_SECURE),
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        },
        throttler: {
            ttl: parseInt(process.env.THROTTLE_TTL, 10),
            limit: parseInt(process.env.THROTTLE_LIMIT, 10),
        },
        url: process.env.FRONTEND_URL,
        testing,
    };
}
exports.config = config;
//# sourceMappingURL=config.js.map