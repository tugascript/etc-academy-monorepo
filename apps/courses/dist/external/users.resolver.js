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
exports.UsersResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const dtos_1 = require("../common/dtos");
const paginated_institutions_type_1 = require("./entities/gql/paginated-institutions.type");
const paginated_profiles_type_1 = require("./entities/gql/paginated-profiles.type");
const user_entity_1 = require("./entities/user.entity");
let UsersResolver = class UsersResolver {
    async getInstitutions(_) {
        return;
    }
    async getProfiles(_) {
        return;
    }
};
__decorate([
    (0, graphql_1.ResolveField)('institutions', () => paginated_institutions_type_1.PaginatedInstitutionsType),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.FilterRelationDto]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "getInstitutions", null);
__decorate([
    (0, graphql_1.ResolveField)('profiles', () => paginated_profiles_type_1.PaginatedProfilesType),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.FilterRelationDto]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "getProfiles", null);
UsersResolver = __decorate([
    (0, graphql_1.Resolver)(() => user_entity_1.UserEntity)
], UsersResolver);
exports.UsersResolver = UsersResolver;
//# sourceMappingURL=users.resolver.js.map