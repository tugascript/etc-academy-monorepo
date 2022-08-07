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
exports.FilterRelationDto = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const enums_1 = require("../enums");
let FilterRelationDto = class FilterRelationDto {
    constructor() {
        this.order = enums_1.QueryOrderEnum.ASC;
        this.first = 10;
    }
};
__decorate([
    (0, graphql_1.Field)(() => enums_1.QueryOrderEnum, { defaultValue: enums_1.QueryOrderEnum.ASC }),
    (0, class_validator_1.IsEnum)(enums_1.QueryOrderEnum),
    __metadata("design:type", String)
], FilterRelationDto.prototype, "order", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { defaultValue: 10 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(50),
    __metadata("design:type", Object)
], FilterRelationDto.prototype, "first", void 0);
FilterRelationDto = __decorate([
    (0, graphql_1.ArgsType)()
], FilterRelationDto);
exports.FilterRelationDto = FilterRelationDto;
//# sourceMappingURL=filter-relation.dto.js.map