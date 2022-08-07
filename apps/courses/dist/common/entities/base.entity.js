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
exports.LocalBaseEntity = void 0;
const core_1 = require("@mikro-orm/core");
const graphql_1 = require("@nestjs/graphql");
let LocalBaseEntity = class LocalBaseEntity {
    constructor() {
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, core_1.PrimaryKey)(),
    __metadata("design:type", Number)
], LocalBaseEntity.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.GraphQLTimestamp),
    (0, core_1.Property)({ onCreate: () => new Date() }),
    __metadata("design:type", Date)
], LocalBaseEntity.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.GraphQLTimestamp),
    (0, core_1.Property)({ onUpdate: () => new Date() }),
    __metadata("design:type", Date)
], LocalBaseEntity.prototype, "updatedAt", void 0);
LocalBaseEntity = __decorate([
    (0, graphql_1.ObjectType)({ isAbstract: true }),
    (0, graphql_1.Directive)('@key(fields: "id")'),
    (0, core_1.Entity)({ abstract: true })
], LocalBaseEntity);
exports.LocalBaseEntity = LocalBaseEntity;
//# sourceMappingURL=base.entity.js.map