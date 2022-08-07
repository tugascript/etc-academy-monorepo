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
exports.ResourceEntity = void 0;
const core_1 = require("@mikro-orm/core");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const constants_1 = require("../../common/constants");
const entities_1 = require("../../common/entities");
const lesson_entity_1 = require("../../lessons/entities/lesson.entity");
const enums_1 = require("../../uploader/enums");
let ResourceEntity = class ResourceEntity extends entities_1.LocalBaseEntity {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, core_1.Property)({ columnType: 'varchar(250)' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUrl)(),
    (0, class_validator_1.Length)(10, 250),
    __metadata("design:type", String)
], ResourceEntity.prototype, "link", void 0);
__decorate([
    (0, graphql_1.Field)(() => enums_1.DocumentTypeEnum),
    (0, core_1.Enum)({
        items: () => enums_1.DocumentTypeEnum,
        columnType: 'varchar(12)',
    }),
    (0, class_validator_1.IsEnum)(enums_1.DocumentTypeEnum),
    __metadata("design:type", String)
], ResourceEntity.prototype, "resourceType", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, core_1.Property)({ columnType: 'varchar(150)' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(constants_1.TITLE_REGEX),
    (0, class_validator_1.Length)(3, 150),
    __metadata("design:type", String)
], ResourceEntity.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, core_1.Property)({ columnType: 'varchar(250)' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(3, 250),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResourceEntity.prototype, "info", void 0);
__decorate([
    (0, graphql_1.Field)(() => lesson_entity_1.LessonEntity),
    (0, core_1.ManyToOne)({
        entity: () => lesson_entity_1.LessonEntity,
        inversedBy: (l) => l.resources,
        onDelete: 'cascade',
    }),
    __metadata("design:type", lesson_entity_1.LessonEntity)
], ResourceEntity.prototype, "lesson", void 0);
ResourceEntity = __decorate([
    (0, graphql_1.ObjectType)('LessonResource'),
    (0, core_1.Entity)({ tableName: 'lesson_resources' })
], ResourceEntity);
exports.ResourceEntity = ResourceEntity;
//# sourceMappingURL=resource.entity.js.map