"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisMessageDto = void 0;
const uuid_1 = require("uuid");
class RedisMessageDto {
    constructor(message) {
        this.status = 'success';
        this.id = (0, uuid_1.v4)();
        this.message = message;
    }
}
exports.RedisMessageDto = RedisMessageDto;
//# sourceMappingURL=redis-message.dto.js.map