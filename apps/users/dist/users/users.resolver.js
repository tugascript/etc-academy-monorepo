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
const decorators_1 = require("../common/decorators");
const dtos_1 = require("../common/dtos");
const filter_relation_dto_1 = require("../common/dtos/filter-relation.dto");
const gql_1 = require("../common/entities/gql");
const paginated_institutions_type_1 = require("../institutions/entities/gql/paginated-institutions.type");
const paginated_profiles_type_1 = require("../profiles/entities/gql/paginated-profiles.type");
const email_dto_1 = require("./dtos/email.dto");
const get_user_dto_1 = require("./dtos/get-user.dto");
const profile_picture_dto_1 = require("./dtos/profile-picture.dto");
const user_dto_1 = require("./dtos/user.dto");
const paginated_users_type_1 = require("./entities/gql/paginated-users.type");
const user_entity_1 = require("./entities/user.entity");
const users_service_1 = require("./users.service");
let UsersResolver = class UsersResolver {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async updateUsersPicture(user, dto) {
        return this.usersService.updateProfilePicture(user.id, dto);
    }
    async toggleTwoFactorAuth(user) {
        return this.usersService.toggleTwoFactor(user.id);
    }
    async updateEmail(user, dto) {
        return this.usersService.updateEmail(user.id, dto.email);
    }
    async deleteAccount(user, password) {
        return this.usersService.deleteUser(user.id, password);
    }
    async me(user) {
        return this.usersService.userById(user.id);
    }
    async userByUsername(dto) {
        return this.usersService.userByUsername(dto.username);
    }
    async userById(dto) {
        return this.usersService.userById(dto.userId);
    }
    async filterUsers(dto) {
        return this.usersService.filterUsers(dto);
    }
    getEmail(userEntity, user) {
        return userEntity.id === user.id ? userEntity.email : null;
    }
    getProfiles(_) {
        return;
    }
    getInstitutions(_) {
        return;
    }
    resolveReference(_) {
        return;
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => user_entity_1.UserEntity),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, profile_picture_dto_1.ProfilePictureDto]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "updateUsersPicture", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_entity_1.UserEntity),
    __param(0, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "toggleTwoFactorAuth", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_entity_1.UserEntity),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, email_dto_1.EmailDto]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "updateEmail", null);
__decorate([
    (0, graphql_1.Mutation)(() => gql_1.LocalMessageType),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "deleteAccount", null);
__decorate([
    (0, graphql_1.Query)(() => user_entity_1.UserEntity),
    __param(0, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "me", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, graphql_1.Query)(() => user_entity_1.UserEntity),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_user_dto_1.GetUserDto]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "userByUsername", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, graphql_1.Query)(() => user_entity_1.UserEntity),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "userById", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, graphql_1.Query)(() => paginated_users_type_1.PaginatedUsersType),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.SearchDto]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "filterUsers", null);
__decorate([
    (0, graphql_1.ResolveField)('email', () => String, { nullable: true }),
    __param(0, (0, graphql_1.Parent)()),
    __param(1, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity, Object]),
    __metadata("design:returntype", String)
], UsersResolver.prototype, "getEmail", null);
__decorate([
    (0, graphql_1.ResolveField)('profiles', () => paginated_profiles_type_1.PaginatedProfilesType),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_relation_dto_1.FilterRelationDto]),
    __metadata("design:returntype", void 0)
], UsersResolver.prototype, "getProfiles", null);
__decorate([
    (0, graphql_1.ResolveField)('institutions', () => paginated_institutions_type_1.PaginatedInstitutionsType),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_relation_dto_1.FilterRelationDto]),
    __metadata("design:returntype", void 0)
], UsersResolver.prototype, "getInstitutions", null);
__decorate([
    (0, graphql_1.ResolveReference)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersResolver.prototype, "resolveReference", null);
UsersResolver = __decorate([
    (0, graphql_1.Resolver)(() => user_entity_1.UserEntity),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersResolver);
exports.UsersResolver = UsersResolver;
//# sourceMappingURL=users.resolver.js.map