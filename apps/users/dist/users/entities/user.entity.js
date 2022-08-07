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
exports.UserEntity = void 0;
const core_1 = require("@mikro-orm/core");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const constants_1 = require("../../common/constants");
const entities_1 = require("../../common/entities");
const institution_entity_1 = require("../../institutions/entities/institution.entity");
const profile_entity_1 = require("../../profiles/entities/profile.entity");
const credentials_embeddable_1 = require("../embeddables/credentials.embeddable");
let UserEntity = class UserEntity extends entities_1.LocalBaseEntity {
    constructor() {
        super(...arguments);
        this.confirmed = false;
        this.suspended = false;
        this.twoFactor = false;
        this.credentials = new credentials_embeddable_1.CredentialsEmbeddable();
        this.lastLogin = new Date();
        this.lastOnline = new Date();
        this.profiles = new core_1.Collection(this);
        this.institutions = new core_1.Collection(this);
    }
};
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, core_1.Property)({ columnType: 'varchar(100)' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(3, 100),
    (0, class_validator_1.Matches)(constants_1.NAME_REGEX),
    __metadata("design:type", String)
], UserEntity.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, core_1.Property)({ columnType: 'varchar(110)', unique: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(3, 110),
    (0, class_validator_1.Matches)(constants_1.SLUG_REGEX),
    __metadata("design:type", String)
], UserEntity.prototype, "username", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, core_1.Property)({ columnType: 'varchar(250)', unique: true }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, core_1.Property)({ columnType: 'varchar(250)', nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], UserEntity.prototype, "picture", void 0);
__decorate([
    (0, core_1.Property)({ columnType: 'varchar(60)' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(59, 60),
    (0, class_validator_1.Matches)(constants_1.BCRYPT_HASH),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    (0, core_1.Property)({ default: false }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UserEntity.prototype, "confirmed", void 0);
__decorate([
    (0, core_1.Property)({ default: false }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UserEntity.prototype, "suspended", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean, { nullable: true }),
    (0, core_1.Property)({ default: false }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UserEntity.prototype, "twoFactor", void 0);
__decorate([
    (0, core_1.Embedded)(() => credentials_embeddable_1.CredentialsEmbeddable),
    __metadata("design:type", credentials_embeddable_1.CredentialsEmbeddable)
], UserEntity.prototype, "credentials", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.GraphQLTimestamp),
    (0, core_1.Property)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], UserEntity.prototype, "lastLogin", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.GraphQLTimestamp),
    (0, core_1.Property)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], UserEntity.prototype, "lastOnline", void 0);
__decorate([
    (0, core_1.OneToMany)(() => profile_entity_1.ProfileEntity, (p) => p.user),
    __metadata("design:type", core_1.Collection)
], UserEntity.prototype, "profiles", void 0);
__decorate([
    (0, core_1.OneToMany)(() => institution_entity_1.InstitutionEntity, (i) => i.owner),
    __metadata("design:type", core_1.Collection)
], UserEntity.prototype, "institutions", void 0);
UserEntity = __decorate([
    (0, graphql_1.ObjectType)('User'),
    (0, core_1.Entity)({ tableName: 'users' })
], UserEntity);
exports.UserEntity = UserEntity;
//# sourceMappingURL=user.entity.js.map