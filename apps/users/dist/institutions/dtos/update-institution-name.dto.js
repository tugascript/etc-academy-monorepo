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
exports.UpdateInstitutionNameDto = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const constants_1 = require("../../common/constants");
const institution_dto_1 = require("./institution.dto");
let UpdateInstitutionNameDto = class UpdateInstitutionNameDto extends institution_dto_1.InstitutionDto {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(3, 100),
    (0, class_validator_1.Matches)(constants_1.NAME_REGEX),
    __metadata("design:type", String)
], UpdateInstitutionNameDto.prototype, "name", void 0);
UpdateInstitutionNameDto = __decorate([
    (0, graphql_1.ArgsType)()
], UpdateInstitutionNameDto);
exports.UpdateInstitutionNameDto = UpdateInstitutionNameDto;
//# sourceMappingURL=update-institution-name.dto.js.map