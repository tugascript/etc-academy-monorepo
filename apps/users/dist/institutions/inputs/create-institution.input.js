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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateInstitutionInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const GraphQLUpload_js_1 = __importDefault(require("graphql-upload/GraphQLUpload.js"));
const initial_address_input_1 = require("../../addresses/inputs/initial-address.input");
const constants_1 = require("../../common/constants");
const dtos_1 = require("../../uploader/dtos");
const institution_type_enum_1 = require("../enums/institution-type.enum");
let CreateInstitutionInput = class CreateInstitutionInput {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(3, 100),
    (0, class_validator_1.Matches)(constants_1.NAME_REGEX),
    __metadata("design:type", String)
], CreateInstitutionInput.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => institution_type_enum_1.InstitutionTypeEnum),
    (0, class_validator_1.IsEnum)(institution_type_enum_1.InstitutionTypeEnum),
    __metadata("design:type", String)
], CreateInstitutionInput.prototype, "institutionType", void 0);
__decorate([
    (0, graphql_1.Field)(() => GraphQLUpload_js_1.default),
    (0, class_validator_1.ValidatePromise)(),
    (0, class_transformer_1.Type)(() => dtos_1.FileUploadDto),
    __metadata("design:type", Promise)
], CreateInstitutionInput.prototype, "picture", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 500),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateInstitutionInput.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(3, 30),
    __metadata("design:type", String)
], CreateInstitutionInput.prototype, "vatNumber", void 0);
__decorate([
    (0, graphql_1.Field)(() => initial_address_input_1.InitialAddressInput),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => initial_address_input_1.InitialAddressInput),
    __metadata("design:type", initial_address_input_1.InitialAddressInput)
], CreateInstitutionInput.prototype, "address", void 0);
CreateInstitutionInput = __decorate([
    (0, graphql_1.InputType)('CreateInstitutionInput')
], CreateInstitutionInput);
exports.CreateInstitutionInput = CreateInstitutionInput;
//# sourceMappingURL=create-institution.input.js.map