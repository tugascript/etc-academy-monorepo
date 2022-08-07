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
exports.InitialAddressInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const constants_1 = require("../../common/constants");
const contry_codes_enum_1 = require("../enums/contry-codes.enum");
let InitialAddressInput = class InitialAddressInput {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(constants_1.ADDRESS_REGEX, { message: "Address can't have symbols." }),
    (0, class_validator_1.Length)(3, 150),
    __metadata("design:type", String)
], InitialAddressInput.prototype, "address", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(constants_1.ADDRESS_REGEX, { message: "Address can't have symbols." }),
    (0, class_validator_1.Length)(1, 150),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], InitialAddressInput.prototype, "address2", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(constants_1.NAME_REGEX, { message: 'City has to be a valid name.' }),
    (0, class_validator_1.Length)(3, 100),
    __metadata("design:type", String)
], InitialAddressInput.prototype, "city", void 0);
__decorate([
    (0, graphql_1.Field)(() => contry_codes_enum_1.CountryCodesEnum),
    (0, class_validator_1.IsEnum)(contry_codes_enum_1.CountryCodesEnum),
    __metadata("design:type", String)
], InitialAddressInput.prototype, "country", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(constants_1.NAME_REGEX),
    (0, class_validator_1.Length)(2, 100),
    __metadata("design:type", String)
], InitialAddressInput.prototype, "state", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(3, 30),
    __metadata("design:type", String)
], InitialAddressInput.prototype, "zipCode", void 0);
InitialAddressInput = __decorate([
    (0, graphql_1.InputType)('InitialAddressInput')
], InitialAddressInput);
exports.InitialAddressInput = InitialAddressInput;
//# sourceMappingURL=initial-address.input.js.map