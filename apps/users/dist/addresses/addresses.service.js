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
exports.AddressesService = void 0;
const nestjs_1 = require("@mikro-orm/nestjs");
const postgresql_1 = require("@mikro-orm/postgresql");
const common_1 = require("@nestjs/common");
const common_2 = require("../common");
const gql_1 = require("../common/entities/gql");
const enums_1 = require("../common/enums");
const profiles_service_1 = require("../profiles/profiles.service");
const address_entity_1 = require("./entities/address.entity");
const address_type_enum_1 = require("./enums/address-type.enum");
let AddressesService = class AddressesService {
    constructor(addressesRepository, commonService, profilesService) {
        this.addressesRepository = addressesRepository;
        this.commonService = commonService;
        this.profilesService = profilesService;
    }
    async createInitialAddress(userId, institutionId, { address, address2, city, country, state, zipCode }) {
        const addressEntity = this.addressesRepository.create({
            address,
            address2,
            city,
            country,
            state,
            zipCode,
            addressType: address_type_enum_1.AddressTypeEnum.LOCATION,
            institution: institutionId,
            author: userId,
        });
        await this.commonService.saveEntity(this.addressesRepository, addressEntity, true);
        return addressEntity;
    }
    async createAddress(userId, { institutionId, addressType, address, address2, city, country, state, zipCode, }) {
        await this.checkProfile(userId, institutionId);
        const addressEntity = this.addressesRepository.create({
            address,
            address2,
            city,
            country,
            state,
            zipCode,
            addressType,
            institution: institutionId,
            author: userId,
        });
        await this.commonService.saveEntity(this.addressesRepository, addressEntity, true);
        return addressEntity;
    }
    async updateAddress(userId, { institutionId, addressId, address, address2, city, zipCode, state, country, }) {
        await this.checkProfile(userId, institutionId);
        const addressEntity = await this.addressById(institutionId, addressId);
        if (address)
            addressEntity.address = address;
        if (address2)
            addressEntity.address2 = address2;
        if (city)
            addressEntity.city = city;
        if (zipCode)
            addressEntity.zipCode = zipCode;
        if (state)
            addressEntity.state = state;
        if (country)
            addressEntity.country = country;
        await this.commonService.saveEntity(this.addressesRepository, addressEntity);
        return addressEntity;
    }
    async deleteAddress(userId, { institutionId, addressId }) {
        await this.checkProfile(userId, institutionId);
        const address = await this.addressById(institutionId, addressId);
        await this.commonService.removeEntity(this.addressesRepository, address);
        return new gql_1.LocalMessageType('Address deleted successfully');
    }
    async addressesByInstitution(institutionId) {
        return this.addressesRepository.find({
            institution: institutionId,
            addressType: address_type_enum_1.AddressTypeEnum.LOCATION,
        });
    }
    async addressesByType(userId, { institutionId, addressType }) {
        await this.checkProfile(userId, institutionId);
        return this.addressesRepository.find({
            institution: institutionId,
            addressType,
        });
    }
    async addressById(institutionId, addressId) {
        const address = await this.addressesRepository.findOne({
            id: addressId,
            institution: institutionId,
        });
        this.commonService.checkExistence('Address', address);
        return address;
    }
    async checkProfile(userId, institutionId) {
        const profile = await this.profilesService.profileByRelations(userId, institutionId);
        if (profile.role !== enums_1.ProfileRoleEnum.ADMIN)
            throw new common_1.UnauthorizedException('Only admins can edit addresses');
    }
};
AddressesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_1.InjectRepository)(address_entity_1.AddressEntity)),
    __metadata("design:paramtypes", [postgresql_1.EntityRepository,
        common_2.CommonService,
        profiles_service_1.ProfilesService])
], AddressesService);
exports.AddressesService = AddressesService;
//# sourceMappingURL=addresses.service.js.map