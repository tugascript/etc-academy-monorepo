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
exports.AddressesResolver = void 0;
const decorators_1 = require("../common/decorators");
const gql_1 = require("../common/entities/gql");
const graphql_1 = require("@nestjs/graphql");
const institution_dto_1 = require("../institutions/dtos/institution.dto");
const addresses_service_1 = require("./addresses.service");
const address_type_dto_1 = require("./dtos/address-type.dto");
const address_dto_1 = require("./dtos/address.dto");
const address_entity_1 = require("./entities/address.entity");
const create_address_input_1 = require("./inputs/create-address.input");
const update_address_input_1 = require("./inputs/update-address.input");
let AddressesResolver = class AddressesResolver {
    constructor(addressesService) {
        this.addressesService = addressesService;
    }
    async createAddress(user, input) {
        return this.addressesService.createAddress(user.id, input);
    }
    async updateAddress(user, input) {
        return this.addressesService.updateAddress(user.id, input);
    }
    async deleteAddress(user, dto) {
        return this.addressesService.deleteAddress(user.id, dto);
    }
    async addressesByInstitution(dto) {
        return this.addressesService.addressesByInstitution(dto.institutionId);
    }
    async addressesByType(user, dto) {
        return this.addressesService.addressesByType(user.id, dto);
    }
    resolveReference(_) {
        return;
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => address_entity_1.AddressEntity),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_address_input_1.CreateAddressInput]),
    __metadata("design:returntype", Promise)
], AddressesResolver.prototype, "createAddress", null);
__decorate([
    (0, graphql_1.Mutation)(() => address_entity_1.AddressEntity),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_address_input_1.UpdateAddressInput]),
    __metadata("design:returntype", Promise)
], AddressesResolver.prototype, "updateAddress", null);
__decorate([
    (0, graphql_1.Mutation)(() => gql_1.LocalMessageType),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, address_dto_1.AddressDto]),
    __metadata("design:returntype", Promise)
], AddressesResolver.prototype, "deleteAddress", null);
__decorate([
    (0, graphql_1.Query)(() => [address_entity_1.AddressEntity]),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [institution_dto_1.InstitutionDto]),
    __metadata("design:returntype", Promise)
], AddressesResolver.prototype, "addressesByInstitution", null);
__decorate([
    (0, graphql_1.Query)(() => [address_entity_1.AddressEntity]),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, address_type_dto_1.AddressTypeDto]),
    __metadata("design:returntype", Promise)
], AddressesResolver.prototype, "addressesByType", null);
__decorate([
    (0, graphql_1.ResolveReference)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AddressesResolver.prototype, "resolveReference", null);
AddressesResolver = __decorate([
    (0, graphql_1.Resolver)(() => address_entity_1.AddressEntity),
    __metadata("design:paramtypes", [addresses_service_1.AddressesService])
], AddressesResolver);
exports.AddressesResolver = AddressesResolver;
//# sourceMappingURL=addresses.resolver.js.map