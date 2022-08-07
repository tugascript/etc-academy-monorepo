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
exports.Paginated = void 0;
const graphql_1 = require("@nestjs/graphql");
const edge_type_1 = require("./edge.type");
let PageInfoType = class PageInfoType {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], PageInfoType.prototype, "startCursor", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], PageInfoType.prototype, "endCursor", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], PageInfoType.prototype, "hasNextPage", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], PageInfoType.prototype, "hasPreviousPage", void 0);
PageInfoType = __decorate([
    (0, graphql_1.ObjectType)('PageInfo')
], PageInfoType);
function Paginated(classRef) {
    let EdgeType = class EdgeType extends (0, edge_type_1.Edge)(classRef) {
    };
    EdgeType = __decorate([
        (0, graphql_1.ObjectType)(`${classRef.name}PageEdge`)
    ], EdgeType);
    let PaginatedType = class PaginatedType {
    };
    __decorate([
        (0, graphql_1.Field)(() => graphql_1.Int),
        __metadata("design:type", Number)
    ], PaginatedType.prototype, "previousCount", void 0);
    __decorate([
        (0, graphql_1.Field)(() => graphql_1.Int),
        __metadata("design:type", Number)
    ], PaginatedType.prototype, "currentCount", void 0);
    __decorate([
        (0, graphql_1.Field)(() => [EdgeType]),
        __metadata("design:type", Array)
    ], PaginatedType.prototype, "edges", void 0);
    __decorate([
        (0, graphql_1.Field)(() => PageInfoType),
        __metadata("design:type", PageInfoType)
    ], PaginatedType.prototype, "pageInfo", void 0);
    PaginatedType = __decorate([
        (0, graphql_1.ObjectType)({ isAbstract: true })
    ], PaginatedType);
    return PaginatedType;
}
exports.Paginated = Paginated;
//# sourceMappingURL=paginated.type.js.map