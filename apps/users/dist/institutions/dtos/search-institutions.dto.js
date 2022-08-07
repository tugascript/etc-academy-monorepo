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
exports.SearchInstitutionsDto = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const contry_codes_enum_1 = require("../../addresses/enums/contry-codes.enum");
const dtos_1 = require("../../common/dtos");
const institution_type_enum_1 = require("../enums/institution-type.enum");
let SearchInstitutionsDto = class SearchInstitutionsDto extends dtos_1.SearchDto {
};
__decorate([
    (0, graphql_1.Field)(() => institution_type_enum_1.InstitutionTypeEnum, { nullable: true }),
    (0, class_validator_1.IsEnum)(institution_type_enum_1.InstitutionTypeEnum),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SearchInstitutionsDto.prototype, "institutionType", void 0);
__decorate([
    (0, graphql_1.Field)(() => contry_codes_enum_1.CountryCodesEnum, { nullable: true }),
    (0, class_validator_1.IsEnum)(contry_codes_enum_1.CountryCodesEnum),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SearchInstitutionsDto.prototype, "country", void 0);
SearchInstitutionsDto = __decorate([
    (0, graphql_1.ArgsType)()
], SearchInstitutionsDto);
exports.SearchInstitutionsDto = SearchInstitutionsDto;
//# sourceMappingURL=search-institutions.dto.js.map