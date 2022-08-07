"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@mikro-orm/core");
const config = process.env.NODE_ENV !== 'production'
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
    };
exports.default = config;
//# sourceMappingURL=mikro-orm.config.js.map