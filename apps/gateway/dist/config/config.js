"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const utils_1 = require("../common/utils");
const core_1 = require("@mikro-orm/core");
function config() {
    const testing = process.env.NODE_ENV !== 'production';
    return {
        services: [
            {
                name: 'users',
                url: process.env.USERS_URL,
            },
            {
                name: 'courses',
                url: process.env.COURSES_URL,
            },
        ],
        port: parseInt(process.env.PORT, 10),
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
        testing,
    };
}
exports.config = config;
//# sourceMappingURL=config.js.map