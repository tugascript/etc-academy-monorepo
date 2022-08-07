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
exports.SlugDto = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const regex_constant_1 = require("../constants/regex.constant");
let SlugDto = class SlugDto {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(regex_constant_1.SLUG_REGEX, { message: 'Invalid slug' }),
    (0, class_validator_1.Length)(3, 110),
    __metadata("design:type", String)
], SlugDto.prototype, "slug", void 0);
SlugDto = __decorate([
    (0, graphql_1.ArgsType)()
], SlugDto);
exports.SlugDto = SlugDto;
//# sourceMappingURL=slug.dto.js.map