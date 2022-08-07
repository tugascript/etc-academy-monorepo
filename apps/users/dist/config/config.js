"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const core_1 = require("@mikro-orm/core");
const utils_1 = require("../common/utils");
function config() {
    const testing = process.env.NODE_ENV !== 'production';
    return {
        port: parseInt(process.env.PORT, 10),
        bucketConfig: {
            name: process.env.BUCKET_NAME,
            region: process.env.BUCKET_REGION,
            host: process.env.BUCKET_HOST,
            uuid: process.env.BUCKET_UUID,
            url: process.env.BUCKET_URL,
            folder: 'users',
            credentials: {
                accessKeyId: process.env.BUCKET_ACCESS_KEY,
                secretAccessKey: process.env.BUCKET_SECRET_KEY,
            },
        },
        db: testing
            ? {
                type: 'sqlite',
                dbName: 'test.db',
                entities: ['dist/**/*.entity.js', 'dist/**/*.embeddable.js'],
                entitiesTs: ['src/**/*.entity.ts', 'src/**/*.embeddable.ts'],
                loadStrategy: core_1.LoadStrategy.JOINED,
                allowGlobalContext: true,
            }
            : {
                type: 'postgresql',
                clientUrl: process.env.DATABASE_URL,
                entities: ['dist/**/*.entity.js', 'dist/**/*.embeddable.js'],
                entitiesTs: ['src/**/*.entity.ts', 'src/**/*.embeddable.ts'],
                loadStrategy: core_1.LoadStrategy.JOINED,
                allowGlobalContext: true,
            },
        redis: (0, utils_1.redisUrlToOptions)(process.env.REDIS_URL),
        upload: {
            maxFileSize: parseInt(process.env.MAX_FILE_SIZE, 10),
            maxFiles: parseInt(process.env.MAX_FILES, 10),
        },
        email: {
            host: process.env.EMAIL_HOST,
            port: parseInt(process.env.EMAIL_PORT, 10),
            secure: process.env.EMAIL_SECURE === 'true',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        },
        testing,
    };
}
exports.config = config;
//# sourceMappingURL=config.js.map