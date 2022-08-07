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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvitationsResolver = void 0;
const decorators_1 = require("../../common/decorators");
const dtos_1 = require("../../common/dtos");
const gql_1 = require("../../common/entities/gql");
const graphql_1 = require("@nestjs/graphql");
const get_invitations_dto_1 = require("../dtos/get-invitations.dto");
const invitation_dto_1 = require("../dtos/invitation.dto");
const invitation_entity_1 = require("../entities/invitation.entity");
const respond_to_invitation_input_1 = require("../inputs/respond-to-invitation.input");
const profiles_service_1 = require("../profiles.service");
let InvitationsResolver = class InvitationsResolver {
    constructor(profilesService) {
        this.profilesService = profilesService;
    }
    async respondToInvitation(user, input) {
        return this.profilesService.respondToInvitation(user.id, input);
    }
    async acceptRejectedInvitation(user, dto) {
        return this.profilesService.acceptRejectedInvitation(user.id, dto.invitationId);
    }
    async invitationByToken(dto) {
        return this.profilesService.invitationByToken(dto.token);
    }
    async invitationsByUser(user, dto) {
        return this.profilesService.invitationsByUser(user.id, dto.status);
    }
    resolveReference(_) {
        return;
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => gql_1.LocalMessageType),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, respond_to_invitation_input_1.RespondToInvitationInput]),
    __metadata("design:returntype", Promise)
], InvitationsResolver.prototype, "respondToInvitation", null);
__decorate([
    (0, graphql_1.Mutation)(() => gql_1.LocalMessageType),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, invitation_dto_1.InvitationDto]),
    __metadata("design:returntype", Promise)
], InvitationsResolver.prototype, "acceptRejectedInvitation", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, graphql_1.Query)(() => invitation_entity_1.InvitationEntity),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.TokenDto]),
    __metadata("design:returntype", Promise)
], InvitationsResolver.prototype, "invitationByToken", null);
__decorate([
    (0, graphql_1.Query)(() => [invitation_entity_1.InvitationEntity]),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, get_invitations_dto_1.GetInvitationsDto]),
    __metadata("design:returntype", Promise)
], InvitationsResolver.prototype, "invitationsByUser", null);
__decorate([
    (0, graphql_1.ResolveReference)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], InvitationsResolver.prototype, "resolveReference", null);
InvitationsResolver = __decorate([
    (0, graphql_1.Resolver)(() => invitation_entity_1.InvitationEntity),
    __metadata("design:paramtypes", [profiles_service_1.ProfilesService])
], InvitationsResolver);
exports.InvitationsResolver = InvitationsResolver;
//# sourceMappingURL=invitations.resolver.js.map