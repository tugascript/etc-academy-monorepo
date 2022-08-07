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
const class_validator_1 = require("class-validator");
const address_entity_1 = require("../../addresses/entities/address.entity");
const constants_1 = require("../../common/constants");
const entities_1 = require("../../common/entities");
const profile_entity_1 = require("../../profiles/entities/profile.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const institution_type_enum_1 = require("../enums/institution-type.enum");
let InstitutionEntity = class InstitutionEntity extends entities_1.LocalBaseEntity {
    constructor() {
        super(...arguments);
        this.addresses = new core_1.Collection(this);
        this.profiles = new core_1.Collection(this);
    }
};
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, core_1.Property)({ columnType: 'varchar(100)' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(3, 100),
    (0, class_validator_1.Matches)(constants_1.NAME_REGEX),
    __metadata("design:type", String)
], InstitutionEntity.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => institution_type_enum_1.InstitutionTypeEnum),
    (0, core_1.Enum)({
        items: () => institution_type_enum_1.InstitutionTypeEnum,
        columnType: 'varchar(10)',
    }),
    (0, class_validator_1.IsEnum)(institution_type_enum_1.InstitutionTypeEnum),
    __metadata("design:type", String)
], InstitutionEntity.prototype, "institutionType", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, core_1.Property)({ columnType: 'varchar(110)', unique: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(3, 110),
    (0, class_validator_1.Matches)(constants_1.SLUG_REGEX),
    __metadata("design:type", String)
], InstitutionEntity.prototype, "slug", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, core_1.Property)({ columnType: 'varchar(250)' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], InstitutionEntity.prototype, "picture", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, core_1.Property)({ columnType: 'text', nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 500),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], InstitutionEntity.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, core_1.Property)({ columnType: 'varchar(250)' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(3, 30),
    __metadata("design:type", String)
], InstitutionEntity.prototype, "vatNumber", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_entity_1.UserEntity),
    (0, core_1.ManyToOne)({
        entity: () => user_entity_1.UserEntity,
        onDelete: 'cascade',
    }),
    __metadata("design:type", user_entity_1.UserEntity)
], InstitutionEntity.prototype, "owner", void 0);
__decorate([
    (0, core_1.OneToMany)(() => address_entity_1.AddressEntity, (a) => a.institution),
    __metadata("design:type", core_1.Collection)
], InstitutionEntity.prototype, "addresses", void 0);
__decorate([
    (0, core_1.OneToMany)(() => profile_entity_1.ProfileEntity, (p) => p.institution),
    __metadata("design:type", core_1.Collection)
], InstitutionEntity.prototype, "profiles", void 0);
InstitutionEntity = __decorate([
    (0, graphql_1.ObjectType)('Institution'),
    (0, core_1.Entity)({ tableName: 'institutions' }),
    (0, core_1.Unique)({ properties: ['name', 'owner'] })
], InstitutionEntity);
exports.InstitutionEntity = InstitutionEntity;
//# sourceMappingURL=institution.entity.js.map