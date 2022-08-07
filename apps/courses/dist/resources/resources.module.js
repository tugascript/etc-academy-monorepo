"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourcesModule = void 0;
const nestjs_1 = require("@mikro-orm/nestjs");
const common_1 = require("@nestjs/common");
const lessons_module_1 = require("../lessons/lessons.module");
const resource_entity_1 = require("./entities/resource.entity");
const resources_resolver_1 = require("./resources.resolver");
const resources_service_1 = require("./resources.service");
let ResourcesModule = class ResourcesModule {
};
ResourcesModule = __decorate([
    (0, common_1.Module)({
        imports: [nestjs_1.MikroOrmModule.forFeature([resource_entity_1.ResourceEntity]), lessons_module_1.LessonsModule],
        providers: [resources_resolver_1.ResourcesResolver, resources_service_1.ResourcesService],
    })
], ResourcesModule);
exports.ResourcesModule = ResourcesModule;
//# sourceMappingURL=resources.module.js.map