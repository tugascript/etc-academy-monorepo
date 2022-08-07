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
exports.AddressEntity = void 0;
const core_1 = require("@mikro-orm/core");
const graphql_1 = require("@nestjs/graphql");
const gql_1 = require("../../common/entities/gql");
const address_type_enum_1 = require("../enums/address-type.enum");
const contry_codes_enum_1 = require("../enums/contry-codes.enum");
const institution_entity_1 = require("./institution.entity");
const user_entity_1 = require("./user.entity");
let AddressEntity = class AddressEntity extends gql_1.LocalBaseType {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], AddressEntity.prototype, "address", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], AddressEntity.prototype, "address2", void 0);
__decorate([
    (0, graphql_1.Field)(() => address_type_enum_1.AddressTypeEnum),
    __metadata("design:type", String)
], AddressEntity.prototype, "addressType", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], AddressEntity.prototype, "city", void 0);
__decorate([
    (0, graphql_1.Field)(() => contry_codes_enum_1.CountryCodesEnum),
    __metadata("design:type", String)
], AddressEntity.prototype, "country", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], AddressEntity.prototype, "state", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], AddressEntity.prototype, "zipCode", void 0);
__decorate([
    (0, graphql_1.Field)(() => institution_entity_1.InstitutionEntity),
    __metadata("design:type", institution_entity_1.InstitutionEntity)
], AddressEntity.prototype, "institution", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_entity_1.UserEntity),
    __metadata("design:type", user_entity_1.UserEntity)
], AddressEntity.prototype, "author", void 0);
AddressEntity = __decorate([
    (0, graphql_1.ObjectType)('Address'),
    (0, core_1.Entity)({ abstract: true })
], AddressEntity);
exports.AddressEntity = AddressEntity;
//# sourceMappingURL=address.entity.js.map