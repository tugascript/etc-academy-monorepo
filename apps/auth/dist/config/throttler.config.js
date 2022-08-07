"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThrottlerConfig = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nestjs_throttler_storage_redis_1 = require("nestjs-throttler-storage-redis");
let ThrottlerConfig = class ThrottlerConfig {
    constructor(configService) {
        this.configService = configService;
    }
    createThrottlerOptions() {
        const config = this.configService.get('throttler');
        return this.configService.get('testing')
            ? config
            : Object.assign(Object.assign({}, config), { storage: new nestjs_throttler_storage_redis_1.ThrottlerStorageRedisService(this.configService.get('redis')) });
    }
};
ThrottlerConfig = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], ThrottlerConfig);
exports.ThrottlerConfig = ThrottlerConfig;
//# sourceMappingURL=throttler.config.js.map