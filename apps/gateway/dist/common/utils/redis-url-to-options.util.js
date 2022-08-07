"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisUrlToOptions = void 0;
const redisUrlToOptions = (url) => {
    const arr = url.split('://:')[1].split('@');
    const secondArr = arr[1].split(':');
    return {
        password: arr[0],
        host: secondArr[0],
        port: parseInt(secondArr[1], 10),
    };
};
exports.redisUrlToOptions = redisUrlToOptions;
//# sourceMappingURL=redis-url-to-options.util.js.map