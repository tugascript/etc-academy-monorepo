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
exports.CreateLessonInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const constants_1 = require("../../common/constants");
const lesson_type_enum_1 = require("../enums/lesson-type.enum");
let CreateLessonInput = class CreateLessonInput {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateLessonInput.prototype, "courseId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(constants_1.TITLE_REGEX),
    (0, class_validator_1.Length)(3, 150),
    __metadata("design:type", String)
], CreateLessonInput.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(() => lesson_type_enum_1.LessonTypeEnum),
    (0, class_validator_1.IsEnum)(lesson_type_enum_1.LessonTypeEnum),
    __metadata("design:type", String)
], CreateLessonInput.prototype, "lessonType", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateLessonInput.prototype, "time", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUrl)(),
    (0, class_validator_1.ValidateIf)((obj) => obj.lessonType === lesson_type_enum_1.LessonTypeEnum.ONLINE),
    __metadata("design:type", String)
], CreateLessonInput.prototype, "link", void 0);
CreateLessonInput = __decorate([
    (0, graphql_1.InputType)('CreateLessonInput')
], CreateLessonInput);
exports.CreateLessonInput = CreateLessonInput;
//# sourceMappingURL=create-lesson.input.js.map