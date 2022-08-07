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
exports.InstitutionsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const address_entity_1 = require("../addresses/entities/address.entity");
const decorators_1 = require("../common/decorators");
const dtos_1 = require("../common/dtos");
const filter_relation_dto_1 = require("../common/dtos/filter-relation.dto");
const gql_1 = require("../common/entities/gql");
const paginated_profiles_type_1 = require("../profiles/entities/gql/paginated-profiles.type");
const institution_dto_1 = require("./dtos/institution.dto");
const search_institutions_dto_1 = require("./dtos/search-institutions.dto");
const update_institution_description_dto_1 = require("./dtos/update-institution-description.dto");
const update_institution_name_dto_1 = require("./dtos/update-institution-name.dto");
const update_institution_picture_dto_1 = require("./dtos/update-institution-picture.dto");
const paginated_institutions_type_1 = require("./entities/gql/paginated-institutions.type");
const institution_entity_1 = require("./entities/institution.entity");
const create_institution_input_1 = require("./inputs/create-institution.input");
const institutions_service_1 = require("./institutions.service");
let InstitutionsResolver = class InstitutionsResolver {
    constructor(institutionsService) {
        this.institutionsService = institutionsService;
    }
    async createInstitution(user, input) {
        return this.institutionsService.createInstitution(user.id, input);
    }
    async updateInstitutionName(user, dto) {
        return this.institutionsService.updateInstitutionName(user.id, dto);
    }
    async updateInstitutionDescription(user, dto) {
        return this.institutionsService.updateInstitutionDescription(user.id, dto);
    }
    async updateInstitutionPicture(user, dto) {
        return this.institutionsService.updateInstitutionPicture(user.id, dto);
    }
    async deleteInstitution(user, dto) {
        return this.institutionsService.deleteInstitution(user.id, dto.institutionId);
    }
    async institutionById(dto) {
        return this.institutionsService.institutionById(dto.institutionId);
    }
    async institutionBySlug(dto) {
        return this.institutionsService.institutionBySlug(dto.slug);
    }
    async searchInstitutions(dto) {
        return this.institutionsService.searchInstitutions(dto);
    }
    async ownersInstitutions(user) {
        return this.institutionsService.ownersInstitutions(user.id);
    }
    async usersInstitutions(user, dto) {
        return this.institutionsService.usersInstitutions(user.id, dto);
    }
    getAddresses() {
        return;
    }
    getProfiles(_) {
        return;
    }
    resolveReference(_) {
        return;
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => institution_entity_1.InstitutionEntity),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_institution_input_1.CreateInstitutionInput]),
    __metadata("design:returntype", Promise)
], InstitutionsResolver.prototype, "createInstitution", null);
__decorate([
    (0, graphql_1.Mutation)(() => institution_entity_1.InstitutionEntity),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_institution_name_dto_1.UpdateInstitutionNameDto]),
    __metadata("design:returntype", Promise)
], InstitutionsResolver.prototype, "updateInstitutionName", null);
__decorate([
    (0, graphql_1.Mutation)(() => institution_entity_1.InstitutionEntity),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_institution_description_dto_1.UpdateInstitutionDescriptionDto]),
    __metadata("design:returntype", Promise)
], InstitutionsResolver.prototype, "updateInstitutionDescription", null);
__decorate([
    (0, graphql_1.Mutation)(() => institution_entity_1.InstitutionEntity),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_institution_picture_dto_1.UpdateInstitutionPictureDto]),
    __metadata("design:returntype", Promise)
], InstitutionsResolver.prototype, "updateInstitutionPicture", null);
__decorate([
    (0, graphql_1.Mutation)(() => gql_1.LocalMessageType),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, institution_dto_1.InstitutionDto]),
    __metadata("design:returntype", Promise)
], InstitutionsResolver.prototype, "deleteInstitution", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, graphql_1.Query)(() => institution_entity_1.InstitutionEntity),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [institution_dto_1.InstitutionDto]),
    __metadata("design:returntype", Promise)
], InstitutionsResolver.prototype, "institutionById", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, graphql_1.Query)(() => institution_entity_1.InstitutionEntity),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.SlugDto]),
    __metadata("design:returntype", Promise)
], InstitutionsResolver.prototype, "institutionBySlug", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, graphql_1.Query)(() => paginated_institutions_type_1.PaginatedInstitutionsType),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_institutions_dto_1.SearchInstitutionsDto]),
    __metadata("design:returntype", Promise)
], InstitutionsResolver.prototype, "searchInstitutions", null);
__decorate([
    (0, graphql_1.Query)(() => [institution_entity_1.InstitutionEntity]),
    __param(0, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InstitutionsResolver.prototype, "ownersInstitutions", null);
__decorate([
    (0, graphql_1.Query)(() => paginated_institutions_type_1.PaginatedInstitutionsType),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dtos_1.SearchDto]),
    __metadata("design:returntype", Promise)
], InstitutionsResolver.prototype, "usersInstitutions", null);
__decorate([
    (0, graphql_1.ResolveField)('addresses', () => [address_entity_1.AddressEntity]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], InstitutionsResolver.prototype, "getAddresses", null);
__decorate([
    (0, graphql_1.ResolveField)('profiles', () => paginated_profiles_type_1.PaginatedProfilesType),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_relation_dto_1.FilterRelationDto]),
    __metadata("design:returntype", void 0)
], InstitutionsResolver.prototype, "getProfiles", null);
__decorate([
    (0, graphql_1.ResolveReference)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], InstitutionsResolver.prototype, "resolveReference", null);
InstitutionsResolver = __decorate([
    (0, graphql_1.Resolver)(() => institution_entity_1.InstitutionEntity),
    __metadata("design:paramtypes", [institutions_service_1.InstitutionsService])
], InstitutionsResolver);
exports.InstitutionsResolver = InstitutionsResolver;
//# sourceMappingURL=institutions.resolver.js.map