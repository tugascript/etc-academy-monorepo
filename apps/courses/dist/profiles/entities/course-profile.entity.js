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
exports.CourseProfileEntity = void 0;
const core_1 = require("@mikro-orm/core");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const constants_1 = require("../../common/constants");
const entities_1 = require("../../common/entities");
const enums_1 = require("../../common/enums");
const course_entity_1 = require("../../courses/entities/course.entity");
const lesson_entity_1 = require("../../lessons/entities/lesson.entity");
let CourseProfileEntity = class CourseProfileEntity extends entities_1.LocalBaseEntity {
    constructor() {
        super(...arguments);
        this.managedLessons = new core_1.Collection(this);
    }
};
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, core_1.Property)({ columnType: 'varchar(110)', unique: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(3, 110),
    (0, class_validator_1.Matches)(constants_1.SLUG_REGEX),
    __metadata("design:type", String)
], CourseProfileEntity.prototype, "slug", void 0);
__decorate([
    (0, graphql_1.Field)(() => enums_1.ProfileRoleEnum),
    (0, core_1.Enum)({
        items: () => enums_1.ProfileRoleEnum,
        columnType: 'varchar(9)',
    }),
    (0, class_validator_1.IsEnum)(enums_1.ProfileRoleEnum),
    __metadata("design:type", String)
], CourseProfileEntity.prototype, "role", void 0);
__decorate([
    (0, graphql_1.Field)(() => enums_1.ProfileStatusEnum),
    (0, core_1.Enum)({
        items: () => enums_1.ProfileStatusEnum,
        columnType: 'varchar(9)',
    }),
    (0, class_validator_1.IsEnum)(enums_1.ProfileStatusEnum),
    __metadata("design:type", String)
], CourseProfileEntity.prototype, "status", void 0);
__decorate([
    (0, core_1.Property)({ columnType: 'int' }),
    __metadata("design:type", Number)
], CourseProfileEntity.prototype, "userId", void 0);
__decorate([
    (0, core_1.Property)({ columnType: 'int' }),
    __metadata("design:type", Number)
], CourseProfileEntity.prototype, "institutionProfileId", void 0);
__decorate([
    (0, core_1.Property)({ columnType: 'int' }),
    __metadata("design:type", Number)
], CourseProfileEntity.prototype, "institutionId", void 0);
__decorate([
    (0, graphql_1.Field)(() => course_entity_1.CourseEntity),
    (0, core_1.ManyToOne)({
        entity: () => course_entity_1.CourseEntity,
        onDelete: 'cascade',
        inversedBy: (c) => c.profiles,
    }),
    __metadata("design:type", course_entity_1.CourseEntity)
], CourseProfileEntity.prototype, "course", void 0);
__decorate([
    (0, core_1.OneToMany)(() => lesson_entity_1.LessonEntity, (l) => l.manager),
    __metadata("design:type", core_1.Collection)
], CourseProfileEntity.prototype, "managedLessons", void 0);
CourseProfileEntity = __decorate([
    (0, graphql_1.ObjectType)('CourseProfile'),
    (0, core_1.Entity)({ tableName: 'course_profiles' }),
    (0, core_1.Unique)({ properties: ['course', 'userId'] }),
    (0, core_1.Unique)({ properties: ['course', 'institutionProfileId'] })
], CourseProfileEntity);
exports.CourseProfileEntity = CourseProfileEntity;
//# sourceMappingURL=course-profile.entity.js.map