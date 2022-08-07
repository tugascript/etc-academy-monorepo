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
exports.UpdateInvitationInput = void 0;
const enums_1 = require("../../common/enums");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let UpdateInvitationInput = class UpdateInvitationInput {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], UpdateInvitationInput.prototype, "invitationId", void 0);
__decorate([
    (0, graphql_1.Field)(() => enums_1.RequestStatusEnum),
    (0, class_validator_1.IsEnum)(enums_1.RequestStatusEnum),
    (0, class_validator_1.IsIn)([enums_1.RequestStatusEnum.ACCEPTED]),
    __metadata("design:type", String)
], UpdateInvitationInput.prototype, "response", void 0);
UpdateInvitationInput = __decorate([
    (0, graphql_1.InputType)('UpdateInvitationInput')
], UpdateInvitationInput);
exports.UpdateInvitationInput = UpdateInvitationInput;
//# sourceMappingURL=update-invitation.input.js.map