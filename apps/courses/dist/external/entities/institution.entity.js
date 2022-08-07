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
exports.InstitutionEntity = void 0;
const core_1 = require("@mikro-orm/core");
const graphql_1 = require("@nestjs/graphql");
const gql_1 = require("../../common/entities/gql");
const institution_type_enum_1 = require("../enums/institution-type.enum");
const user_entity_1 = require("./user.entity");
let InstitutionEntity = class InstitutionEntity extends gql_1.LocalBaseType {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], InstitutionEntity.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => institution_type_enum_1.InstitutionTypeEnum),
    __metadata("design:type", String)
], InstitutionEntity.prototype, "institutionType", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], InstitutionEntity.prototype, "slug", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], InstitutionEntity.prototype, "picture", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], InstitutionEntity.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], InstitutionEntity.prototype, "vatNumber", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_entity_1.UserEntity),
    __metadata("design:type", user_entity_1.UserEntity)
], InstitutionEntity.prototype, "owner", void 0);
InstitutionEntity = __decorate([
    (0, graphql_1.ObjectType)('Institution'),
    (0, core_1.Entity)({ abstract: true })
], InstitutionEntity);
exports.InstitutionEntity = InstitutionEntity;
//# sourceMappingURL=institution.entity.js.map