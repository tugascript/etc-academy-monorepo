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
exports.ProfileRequestEntity = void 0;
const core_1 = require("@mikro-orm/core");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const entities_1 = require("../../common/entities");
const enums_1 = require("../../common/enums");
const institution_entity_1 = require("../../institutions/entities/institution.entity");
const user_entity_1 = require("../../users/entities/user.entity");
let ProfileRequestEntity = class ProfileRequestEntity extends entities_1.LocalBaseEntity {
    constructor() {
        super(...arguments);
        this.status = enums_1.RequestStatusEnum.PENDING;
    }
};
__decorate([
    (0, graphql_1.Field)(() => enums_1.RequestStatusEnum),
    (0, core_1.Enum)({
        items: () => enums_1.RequestStatusEnum,
        columnType: 'varchar(8)',
        default: enums_1.RequestStatusEnum.PENDING,
    }),
    (0, class_validator_1.IsEnum)(enums_1.RequestStatusEnum),
    __metadata("design:type", String)
], ProfileRequestEntity.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(() => enums_1.ProfileStatusEnum),
    (0, core_1.Enum)({
        items: () => enums_1.ProfileStatusEnum,
        columnType: 'varchar(9)',
    }),
    (0, class_validator_1.IsEnum)(enums_1.ProfileStatusEnum),
    __metadata("design:type", String)
], ProfileRequestEntity.prototype, "profileStatus", void 0);
__decorate([
    (0, graphql_1.Field)(() => enums_1.ProfileRoleEnum),
    (0, core_1.Enum)({
        items: () => enums_1.ProfileRoleEnum,
        columnType: 'varchar(9)',
    }),
    (0, class_validator_1.IsEnum)(enums_1.ProfileRoleEnum),
    __metadata("design:type", String)
], ProfileRequestEntity.prototype, "profileRole", void 0);
__decorate([
    (0, graphql_1.Field)(() => institution_entity_1.InstitutionEntity),
    (0, core_1.ManyToOne)({
        entity: () => institution_entity_1.InstitutionEntity,
        onDelete: 'cascade',
    }),
    __metadata("design:type", institution_entity_1.InstitutionEntity)
], ProfileRequestEntity.prototype, "institution", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_entity_1.UserEntity),
    (0, core_1.ManyToOne)({
        entity: () => user_entity_1.UserEntity,
        onDelete: 'cascade',
    }),
    __metadata("design:type", user_entity_1.UserEntity)
], ProfileRequestEntity.prototype, "recipient", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_entity_1.UserEntity),
    (0, core_1.ManyToOne)({
        entity: () => user_entity_1.UserEntity,
        onDelete: 'cascade',
    }),
    __metadata("design:type", user_entity_1.UserEntity)
], ProfileRequestEntity.prototype, "sender", void 0);
ProfileRequestEntity = __decorate([
    (0, graphql_1.ObjectType)('ProfileRequest'),
    (0, core_1.Entity)({ tableName: 'profile_requests' })
], ProfileRequestEntity);
exports.ProfileRequestEntity = ProfileRequestEntity;
//# sourceMappingURL=profile-request.entity.js.map