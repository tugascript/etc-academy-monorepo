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
exports.LessonEntity = void 0;
const core_1 = require("@mikro-orm/core");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const constants_1 = require("../../common/constants");
const entities_1 = require("../../common/entities");
const course_entity_1 = require("../../courses/entities/course.entity");
const course_profile_entity_1 = require("../../profiles/entities/course-profile.entity");
const resource_entity_1 = require("../../resources/entities/resource.entity");
const lesson_type_enum_1 = require("../enums/lesson-type.enum");
let LessonEntity = class LessonEntity extends entities_1.LocalBaseEntity {
    constructor() {
        super(...arguments);
        this.available = false;
        this.resources = new core_1.Collection(this);
    }
};
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, core_1.Property)({ columnType: 'varchar(150)' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(constants_1.TITLE_REGEX),
    (0, class_validator_1.Length)(3, 150),
    __metadata("design:type", String)
], LessonEntity.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    (0, core_1.Property)({ default: false }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], LessonEntity.prototype, "available", void 0);
__decorate([
    (0, graphql_1.Field)(() => lesson_type_enum_1.LessonTypeEnum),
    (0, core_1.Enum)({
        items: () => lesson_type_enum_1.LessonTypeEnum,
        columnType: 'varchar(9)',
    }),
    (0, class_validator_1.IsEnum)(lesson_type_enum_1.LessonTypeEnum),
    __metadata("design:type", String)
], LessonEntity.prototype, "lessonType", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, core_1.Property)({ columnType: 'varchar(250)', nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUrl)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LessonEntity.prototype, "link", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, core_1.Property)({ columnType: 'int' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], LessonEntity.prototype, "num", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.GraphQLTimestamp),
    (0, core_1.Property)({ type: 'timestamp' }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], LessonEntity.prototype, "time", void 0);
__decorate([
    (0, graphql_1.Field)(() => course_entity_1.CourseEntity),
    (0, core_1.ManyToOne)({
        entity: () => course_entity_1.CourseEntity,
        onDelete: 'cascade',
        inversedBy: (c) => c.lessons,
    }),
    __metadata("design:type", course_entity_1.CourseEntity)
], LessonEntity.prototype, "course", void 0);
__decorate([
    (0, graphql_1.Field)(() => course_profile_entity_1.CourseProfileEntity),
    (0, core_1.ManyToOne)({
        entity: () => course_profile_entity_1.CourseProfileEntity,
        onDelete: 'cascade',
        inversedBy: (c) => c.managedLessons,
    }),
    __metadata("design:type", course_profile_entity_1.CourseProfileEntity)
], LessonEntity.prototype, "manager", void 0);
__decorate([
    (0, core_1.OneToMany)(() => resource_entity_1.ResourceEntity, (r) => r.lesson),
    __metadata("design:type", core_1.Collection)
], LessonEntity.prototype, "resources", void 0);
LessonEntity = __decorate([
    (0, graphql_1.ObjectType)('Lesson'),
    (0, core_1.Entity)({ tableName: 'lessons' })
], LessonEntity);
exports.LessonEntity = LessonEntity;
//# sourceMappingURL=lesson.entity.js.map