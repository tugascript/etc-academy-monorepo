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
const gql_1 = require("../../common/entities/gql");
let UserEntity = class UserEntity extends gql_1.LocalBaseType {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], UserEntity.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], UserEntity.prototype, "username", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "picture", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean, { nullable: true }),
    __metadata("design:type", Boolean)
], UserEntity.prototype, "twoFactor", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.GraphQLTimestamp),
    __metadata("design:type", Date)
], UserEntity.prototype, "lastOnline", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.GraphQLTimestamp),
    __metadata("design:type", Date)
], UserEntity.prototype, "lastLogin", void 0);
UserEntity = __decorate([
    (0, graphql_1.ObjectType)('User'),
    (0, core_1.Entity)({ abstract: true })
], UserEntity);
exports.UserEntity = UserEntity;
//# sourceMappingURL=user.entity.js.map