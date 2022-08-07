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
exports.ProfileEntity = void 0;
const core_1 = require("@mikro-orm/core");
const graphql_1 = require("@nestjs/graphql");
const gql_1 = require("../../common/entities/gql");
const enums_1 = require("../../common/enums");
const institution_entity_1 = require("./institution.entity");
const user_entity_1 = require("./user.entity");
let ProfileEntity = class ProfileEntity extends gql_1.LocalBaseType {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ProfileEntity.prototype, "slug", void 0);
__decorate([
    (0, graphql_1.Field)(() => enums_1.ProfileRoleEnum),
    __metadata("design:type", String)
], ProfileEntity.prototype, "role", void 0);
__decorate([
    (0, graphql_1.Field)(() => enums_1.ProfileStatusEnum),
    __metadata("design:type", String)
], ProfileEntity.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], ProfileEntity.prototype, "picture", void 0);
__decorate([
    (0, graphql_1.Field)(() => institution_entity_1.InstitutionEntity),
    __metadata("design:type", institution_entity_1.InstitutionEntity)
], ProfileEntity.prototype, "institution", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_entity_1.UserEntity),
    __metadata("design:type", user_entity_1.UserEntity)
], ProfileEntity.prototype, "user", void 0);
ProfileEntity = __decorate([
    (0, graphql_1.ObjectType)('InstitutionProfile'),
    (0, core_1.Entity)({ abstract: true })
], ProfileEntity);
exports.ProfileEntity = ProfileEntity;
//# sourceMappingURL=institution-profile.entity.js.map