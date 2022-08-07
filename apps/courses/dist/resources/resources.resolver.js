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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourcesResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const decorators_1 = require("../common/decorators");
const gql_1 = require("../common/entities/gql");
const lesson_id_dto_1 = require("./dtos/lesson-id.dto");
const resource_dto_1 = require("./dtos/resource.dto");
const update_resource_file_dto_1 = require("./dtos/update-resource-file.dto");
const update_resource_info_dto_1 = require("./dtos/update-resource-info.dto");
const update_resource_title_dto_1 = require("./dtos/update-resource-title.dto");
const resource_entity_1 = require("./entities/resource.entity");
const create_resource_input_1 = require("./inputs/create-resource.input");
const resources_service_1 = require("./resources.service");
let ResourcesResolver = class ResourcesResolver {
    constructor(resourcesService) {
        this.resourcesService = resourcesService;
    }
    async createResource(user, input) {
        return this.resourcesService.createResource(user.id, input);
    }
    async updateResourceFile(user, dto) {
        return this.resourcesService.updateResourceFile(user.id, dto);
    }
    async updateResourceInfo(user, dto) {
        return this.resourcesService.updateResourceInfo(user.id, dto);
    }
    async updateResourceTitle(user, dto) {
        return this.resourcesService.updateResourceTitle(user.id, dto);
    }
    async deleteResource(user, dto) {
        return this.resourcesService.deleteResource(user.id, dto);
    }
    async resourcesByLesson(user, dto) {
        return this.resourcesService.resourcesByLesson(user.id, dto.lessonId);
    }
    async resourceById(user, dto) {
        return this.resourcesService.resourceById(user.id, dto);
    }
    resolveReference(_) {
        return;
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => resource_entity_1.ResourceEntity),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_resource_input_1.CreateResourceInput]),
    __metadata("design:returntype", Promise)
], ResourcesResolver.prototype, "createResource", null);
__decorate([
    (0, graphql_1.Mutation)(() => resource_entity_1.ResourceEntity),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_resource_file_dto_1.UpdateResourceFileDto]),
    __metadata("design:returntype", Promise)
], ResourcesResolver.prototype, "updateResourceFile", null);
__decorate([
    (0, graphql_1.Mutation)(() => resource_entity_1.ResourceEntity),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_resource_info_dto_1.UpdateResourceInfoDto]),
    __metadata("design:returntype", Promise)
], ResourcesResolver.prototype, "updateResourceInfo", null);
__decorate([
    (0, graphql_1.Mutation)(() => resource_entity_1.ResourceEntity),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_resource_title_dto_1.UpdateResourceTitleDto]),
    __metadata("design:returntype", Promise)
], ResourcesResolver.prototype, "updateResourceTitle", null);
__decorate([
    (0, graphql_1.Mutation)(() => gql_1.LocalMessageType),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, resource_dto_1.ResourceDto]),
    __metadata("design:returntype", Promise)
], ResourcesResolver.prototype, "deleteResource", null);
__decorate([
    (0, graphql_1.Query)(() => [resource_entity_1.ResourceEntity]),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, lesson_id_dto_1.LessonIdDto]),
    __metadata("design:returntype", Promise)
], ResourcesResolver.prototype, "resourcesByLesson", null);
__decorate([
    (0, graphql_1.Query)(() => resource_entity_1.ResourceEntity),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, resource_dto_1.ResourceDto]),
    __metadata("design:returntype", Promise)
], ResourcesResolver.prototype, "resourceById", null);
__decorate([
    (0, graphql_1.ResolveReference)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ResourcesResolver.prototype, "resolveReference", null);
ResourcesResolver = __decorate([
    (0, graphql_1.Resolver)(() => resource_entity_1.ResourceEntity),
    __metadata("design:paramtypes", [resources_service_1.ResourcesService])
], ResourcesResolver);
exports.ResourcesResolver = ResourcesResolver;
//# sourceMappingURL=resources.resolver.js.map