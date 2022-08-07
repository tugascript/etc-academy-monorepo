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
exports.ResourcesService = void 0;
const nestjs_1 = require("@mikro-orm/nestjs");
const postgresql_1 = require("@mikro-orm/postgresql");
const common_1 = require("@nestjs/common");
const common_2 = require("../common");
const gql_1 = require("../common/entities/gql");
const lessons_service_1 = require("../lessons/lessons.service");
const uploader_1 = require("../uploader");
const constants_1 = require("../uploader/constants");
const resource_entity_1 = require("./entities/resource.entity");
let ResourcesService = class ResourcesService {
    constructor(resourceRepository, commonService, uploaderService, lessonsService) {
        this.resourceRepository = resourceRepository;
        this.commonService = commonService;
        this.uploaderService = uploaderService;
        this.lessonsService = lessonsService;
    }
    async createResource(userId, { lessonId, title, file, info }) {
        await this.checkLesson(userId, lessonId);
        const resourceType = await this.checkFile(file);
        const link = await this.uploaderService.uploadDocument(userId, file);
        const resource = this.resourceRepository.create({
            title: this.commonService.formatTitle(title),
            lesson: lessonId,
            link,
            resourceType,
            info,
        });
        await this.commonService.saveEntity(this.resourceRepository, resource, true);
        return resource;
    }
    async updateResourceFile(userId, { lessonId, resourceId, file }) {
        await this.checkLesson(userId, lessonId);
        const resource = await this.findResourceById(lessonId, resourceId);
        const resourceType = await this.checkFile(file);
        const link = await this.uploaderService.uploadDocument(userId, file);
        resource.link = link;
        resource.resourceType = resourceType;
        await this.commonService.saveEntity(this.resourceRepository, resource);
        return resource;
    }
    async updateResourceInfo(userId, { lessonId, resourceId, info }) {
        await this.checkLesson(userId, lessonId);
        const resource = await this.findResourceById(lessonId, resourceId);
        resource.info = info;
        await this.commonService.saveEntity(this.resourceRepository, resource);
        return resource;
    }
    async updateResourceTitle(userId, { lessonId, resourceId, title }) {
        await this.checkLesson(userId, lessonId);
        const resource = await this.findResourceById(lessonId, resourceId);
        resource.title = this.commonService.formatTitle(title);
        await this.commonService.saveEntity(this.resourceRepository, resource);
        return resource;
    }
    async deleteResource(userId, { lessonId, resourceId }) {
        await this.checkLesson(userId, lessonId);
        const resource = await this.findResourceById(lessonId, resourceId);
        await this.commonService.removeEntity(this.resourceRepository, resource);
        return new gql_1.LocalMessageType('Resource deleted successfully');
    }
    async resourceById(userId, { lessonId, resourceId }) {
        await this.checkLesson(userId, lessonId);
        return this.findResourceById(lessonId, resourceId);
    }
    async resourcesByLesson(userId, lessonId) {
        await this.checkLesson(userId, lessonId);
        return this.resourceRepository.find({
            lesson: lessonId,
        });
    }
    async findResourceById(lessonId, resourceId) {
        const resource = await this.resourceRepository.findOne({
            id: resourceId,
            lesson: lessonId,
        });
        this.commonService.checkExistence('Resource', resource);
        return resource;
    }
    async checkFile(file) {
        const { mimetype } = await file;
        const documentType = constants_1.DOCUMENT_TYPES[mimetype];
        if (!documentType)
            throw new common_1.BadRequestException('Invalid file type');
        return documentType.fileType;
    }
    async checkLesson(userId, lessonId) {
        const lesson = await this.lessonsService.lessonByIdWithManager(lessonId);
        if (lesson.manager.userId !== userId)
            throw new common_1.UnauthorizedException('You are not manager of this lesson');
    }
};
ResourcesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_1.InjectRepository)(resource_entity_1.ResourceEntity)),
    __metadata("design:paramtypes", [postgresql_1.EntityRepository,
        common_2.CommonService,
        uploader_1.UploaderService,
        lessons_service_1.LessonsService])
], ResourcesService);
exports.ResourcesService = ResourcesService;
//# sourceMappingURL=resources.service.js.map