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
exports.CourseEntity = void 0;
const core_1 = require("@mikro-orm/core");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const constants_1 = require("../../common/constants");
const entities_1 = require("../../common/entities");
const lesson_entity_1 = require("../../lessons/entities/lesson.entity");
const course_profile_entity_1 = require("../../profiles/entities/course-profile.entity");
const course_type_enum_1 = require("../enums/course-type.enum");
let CourseEntity = class CourseEntity extends entities_1.LocalBaseEntity {
    constructor() {
        super(...arguments);
        this.profiles = new core_1.Collection(this);
        this.lessons = new core_1.Collection(this);
    }
};
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, core_1.Property)({ columnType: 'varchar(100)' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(3, 100),
    (0, class_validator_1.Matches)(constants_1.NAME_REGEX),
    __metadata("design:type", String)
], CourseEntity.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, core_1.Property)({ columnType: 'varchar(110)', unique: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(3, 110),
    (0, class_validator_1.Matches)(constants_1.SLUG_REGEX),
    __metadata("design:type", String)
], CourseEntity.prototype, "slug", void 0);
__decorate([
    (0, graphql_1.Field)(() => course_type_enum_1.CourseTypeEnum),
    (0, core_1.Enum)({
        items: () => course_type_enum_1.CourseTypeEnum,
        columnType: 'varchar(9)',
    }),
    (0, class_validator_1.IsEnum)(course_type_enum_1.CourseTypeEnum),
    __metadata("design:type", String)
], CourseEntity.prototype, "courseType", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, core_1.Property)({ columnType: 'varchar(250)' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUrl)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CourseEntity.prototype, "picture", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, core_1.Property)({ columnType: 'text', nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 500),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CourseEntity.prototype, "description", void 0);
__decorate([
    (0, core_1.Property)({ columnType: 'int' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CourseEntity.prototype, "institutionId", void 0);
__decorate([
    (0, core_1.Property)({ columnType: 'int' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CourseEntity.prototype, "authorId", void 0);
__decorate([
    (0, core_1.OneToMany)(() => course_profile_entity_1.CourseProfileEntity, (cp) => cp.course),
    __metadata("design:type", core_1.Collection)
], CourseEntity.prototype, "profiles", void 0);
__decorate([
    (0, core_1.OneToMany)(() => lesson_entity_1.LessonEntity, (l) => l.course),
    __metadata("design:type", core_1.Collection)
], CourseEntity.prototype, "lessons", void 0);
CourseEntity = __decorate([
    (0, graphql_1.ObjectType)('Course'),
    (0, core_1.Entity)({ tableName: 'courses' }),
    (0, core_1.Unique)({ properties: ['name', 'institutionId'] })
], CourseEntity);
exports.CourseEntity = CourseEntity;
//# sourceMappingURL=course.entity.js.map