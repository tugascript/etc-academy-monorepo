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
exports.ProfileRequestsResolver = void 0;
const decorators_1 = require("../../common/decorators");
const gql_1 = require("../../common/entities/gql");
const graphql_1 = require("@nestjs/graphql");
const filter_profile_requests_dto_1 = require("../dtos/filter-profile-requests.dto");
const profile_request_dto_1 = require("../dtos/profile-request.dto");
const paginated_profile_requests_type_1 = require("../entities/gql/paginated-profile-requests.type");
const profile_request_entity_1 = require("../entities/profile-request.entity");
const create_profile_input_1 = require("../inputs/create-profile.input");
const respond_to_profile_request_input_1 = require("../inputs/respond-to-profile-request.input");
const profiles_service_1 = require("../profiles.service");
let ProfileRequestsResolver = class ProfileRequestsResolver {
    constructor(profilesService) {
        this.profilesService = profilesService;
    }
    async sendProfileRequest(user, input) {
        return this.profilesService.sendProfileRequest(user.id, input);
    }
    async respondToProfileRequest(user, input) {
        return this.profilesService.respondToProfileRequest(user.id, input);
    }
    async acceptRejectedProfileRequest(user, dto) {
        return this.profilesService.acceptRejectedProfileRequest(user.id, dto.requestId);
    }
    async filterProfileRequests(user, dto) {
        return this.profilesService.filterProfileRequests(user.id, dto);
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
    __metadata("design:paramtypes", [Object, create_profile_input_1.CreateProfileInput]),
    __metadata("design:returntype", Promise)
], ProfileRequestsResolver.prototype, "sendProfileRequest", null);
__decorate([
    (0, graphql_1.Mutation)(() => gql_1.LocalMessageType),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, respond_to_profile_request_input_1.RespondToProfileRequestInput]),
    __metadata("design:returntype", Promise)
], ProfileRequestsResolver.prototype, "respondToProfileRequest", null);
__decorate([
    (0, graphql_1.Mutation)(() => gql_1.LocalMessageType),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, profile_request_dto_1.ProfileRequestDto]),
    __metadata("design:returntype", Promise)
], ProfileRequestsResolver.prototype, "acceptRejectedProfileRequest", null);
__decorate([
    (0, graphql_1.Query)(() => paginated_profile_requests_type_1.PaginatedProfileRequestsType),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, filter_profile_requests_dto_1.FilterProfileRequestsDto]),
    __metadata("design:returntype", Promise)
], ProfileRequestsResolver.prototype, "filterProfileRequests", null);
__decorate([
    (0, graphql_1.ResolveReference)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProfileRequestsResolver.prototype, "resolveReference", null);
ProfileRequestsResolver = __decorate([
    (0, graphql_1.Resolver)(() => profile_request_entity_1.ProfileRequestEntity),
    __metadata("design:paramtypes", [profiles_service_1.ProfilesService])
], ProfileRequestsResolver);
exports.ProfileRequestsResolver = ProfileRequestsResolver;
//# sourceMappingURL=profile-requests.resolver.js.map