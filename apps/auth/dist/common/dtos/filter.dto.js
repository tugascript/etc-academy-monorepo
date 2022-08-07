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
exports.FilterDto = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const query_cursor_enum_1 = require("../enums/query-cursor.enum");
const order_dto_1 = require("./order.dto");
let FilterDto = class FilterDto extends order_dto_1.OrderDto {
    constructor() {
        super(...arguments);
        this.cursor = query_cursor_enum_1.QueryCursorEnum.DATE;
    }
};
__decorate([
    (0, graphql_1.Field)(() => query_cursor_enum_1.QueryCursorEnum, { defaultValue: query_cursor_enum_1.QueryCursorEnum.DATE }),
    (0, class_validator_1.IsEnum)(query_cursor_enum_1.QueryCursorEnum),
    __metadata("design:type", String)
], FilterDto.prototype, "cursor", void 0);
FilterDto = __decorate([
    (0, graphql_1.ArgsType)()
], FilterDto);
exports.FilterDto = FilterDto;
//# sourceMappingURL=filter.dto.js.map