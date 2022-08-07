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
exports.UpdateCourseTypeDto = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const course_type_enum_1 = require("../enums/course-type.enum");
const course_dto_1 = require("./course.dto");
let UpdateCourseTypeDto = class UpdateCourseTypeDto extends course_dto_1.CourseDto {
};
__decorate([
    (0, graphql_1.Field)(() => course_type_enum_1.CourseTypeEnum),
    (0, class_validator_1.IsEnum)(course_type_enum_1.CourseTypeEnum),
    __metadata("design:type", String)
], UpdateCourseTypeDto.prototype, "courseType", void 0);
UpdateCourseTypeDto = __decorate([
    (0, graphql_1.ArgsType)()
], UpdateCourseTypeDto);
exports.UpdateCourseTypeDto = UpdateCourseTypeDto;
//# sourceMappingURL=update-course-type.dto.js.map