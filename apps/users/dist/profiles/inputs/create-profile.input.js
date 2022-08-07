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
exports.CreateProfileInput = void 0;
const constants_1 = require("../../common/constants");
const enums_1 = require("../../common/enums");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let CreateProfileInput = class CreateProfileInput {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateProfileInput.prototype, "institutionId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.Length)(6, 250),
    __metadata("design:type", String)
], CreateProfileInput.prototype, "userEmail", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(constants_1.NAME_REGEX, { message: "User's name should be valid" }),
    (0, class_validator_1.Length)(3, 100),
    __metadata("design:type", String)
], CreateProfileInput.prototype, "userName", void 0);
__decorate([
    (0, graphql_1.Field)(() => enums_1.ProfileRoleEnum),
    (0, class_validator_1.IsEnum)(enums_1.ProfileRoleEnum),
    __metadata("design:type", String)
], CreateProfileInput.prototype, "role", void 0);
__decorate([
    (0, graphql_1.Field)(() => enums_1.ProfileStatusEnum),
    (0, class_validator_1.IsEnum)(enums_1.ProfileStatusEnum),
    __metadata("design:type", String)
], CreateProfileInput.prototype, "status", void 0);
CreateProfileInput = __decorate([
    (0, graphql_1.InputType)('CreateProfileInput')
], CreateProfileInput);
exports.CreateProfileInput = CreateProfileInput;
//# sourceMappingURL=create-profile.input.js.map