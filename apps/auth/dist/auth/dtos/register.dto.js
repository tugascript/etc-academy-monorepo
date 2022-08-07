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
exports.RegisterDto = void 0;
const constants_1 = require("../../common/constants");
const class_validator_1 = require("class-validator");
const passwords_dto_1 = require("./passwords.dto");
class RegisterDto extends passwords_dto_1.PasswordsDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(3, 100, {
        message: 'Name has to be between 3 and 50 characters.',
    }),
    (0, class_validator_1.Matches)(constants_1.NAME_REGEX, {
        message: 'Name can only contain letters, dots, numbers and spaces.',
    }),
    __metadata("design:type", String)
], RegisterDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "email", void 0);
exports.RegisterDto = RegisterDto;
//# sourceMappingURL=register.dto.js.map