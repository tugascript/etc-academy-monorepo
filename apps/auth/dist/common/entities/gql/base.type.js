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
exports.LocalBaseType = void 0;
const graphql_1 = require("@nestjs/graphql");
let LocalBaseType = class LocalBaseType {
    constructor() {
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", Number)
], LocalBaseType.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.GraphQLTimestamp),
    __metadata("design:type", Date)
], LocalBaseType.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.GraphQLTimestamp),
    __metadata("design:type", Date)
], LocalBaseType.prototype, "updatedAt", void 0);
LocalBaseType = __decorate([
    (0, graphql_1.ObjectType)({ isAbstract: true }),
    (0, graphql_1.Directive)('@extends'),
    (0, graphql_1.Directive)('@key(fields: "id")')
], LocalBaseType);
exports.LocalBaseType = LocalBaseType;
//# sourceMappingURL=base.type.js.map