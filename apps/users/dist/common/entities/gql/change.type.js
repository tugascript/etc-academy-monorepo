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
exports.Change = void 0;
const graphql_1 = require("@nestjs/graphql");
const change_type_enum_1 = require("../../enums/change-type.enum");
const edge_type_1 = require("./edge.type");
function Change(classRef) {
    let EdgeType = class EdgeType extends (0, edge_type_1.Edge)(classRef) {
    };
    EdgeType = __decorate([
        (0, graphql_1.ObjectType)(`${classRef.name}ChangeEdge`)
    ], EdgeType);
    let ChangeType = class ChangeType {
    };
    __decorate([
        (0, graphql_1.Field)(() => change_type_enum_1.ChangeTypeEnum),
        __metadata("design:type", String)
    ], ChangeType.prototype, "type", void 0);
    __decorate([
        (0, graphql_1.Field)(() => EdgeType),
        __metadata("design:type", EdgeType)
    ], ChangeType.prototype, "edge", void 0);
    ChangeType = __decorate([
        (0, graphql_1.ObjectType)({ isAbstract: true })
    ], ChangeType);
    return ChangeType;
}
exports.Change = Change;
//# sourceMappingURL=change.type.js.map