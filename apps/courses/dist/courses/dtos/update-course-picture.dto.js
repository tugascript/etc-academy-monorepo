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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCoursePictureDto = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const GraphQLUpload_js_1 = __importDefault(require("graphql-upload/GraphQLUpload.js"));
const dtos_1 = require("../../uploader/dtos");
const course_dto_1 = require("./course.dto");
let UpdateCoursePictureDto = class UpdateCoursePictureDto extends course_dto_1.CourseDto {
};
__decorate([
    (0, graphql_1.Field)(() => GraphQLUpload_js_1.default),
    (0, class_validator_1.ValidatePromise)(),
    (0, class_transformer_1.Type)(() => dtos_1.FileUploadDto),
    __metadata("design:type", Promise)
], UpdateCoursePictureDto.prototype, "picture", void 0);
UpdateCoursePictureDto = __decorate([
    (0, graphql_1.ArgsType)()
], UpdateCoursePictureDto);
exports.UpdateCoursePictureDto = UpdateCoursePictureDto;
//# sourceMappingURL=update-course-picture.dto.js.map