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
exports.InstitutionsService = void 0;
const nestjs_1 = require("@mikro-orm/nestjs");
const postgresql_1 = require("@mikro-orm/postgresql");
const common_1 = require("@nestjs/common");
const addresses_service_1 = require("../addresses/addresses.service");
const common_2 = require("../common");
const gql_1 = require("../common/entities/gql");
const enums_1 = require("../common/enums");
const profiles_service_1 = require("../profiles/profiles.service");
const uploader_1 = require("../uploader");
const institution_entity_1 = require("./entities/institution.entity");
let InstitutionsService = class InstitutionsService {
    constructor(institutionsRepository, commonService, uploaderService, profilesService, addressesService) {
        this.institutionsRepository = institutionsRepository;
        this.commonService = commonService;
        this.uploaderService = uploaderService;
        this.profilesService = profilesService;
        this.addressesService = addressesService;
    }
    async createInstitution(userId, { name, institutionType, picture, description, vatNumber, address, }) {
        name = this.commonService.formatTitle(name);
        await this.checkExistence(userId, name);
        const slug = await this.generateSlug(name);
        const image = await this.uploaderService.uploadImage(userId, picture, enums_1.RatioEnum.SQUARE);
        const institution = this.institutionsRepository.create({
            name,
            slug,
            institutionType,
            description,
            vatNumber,
            picture: image,
        });
        await this.commonService.saveEntity(this.institutionsRepository, institution, true);
        await this.profilesService.createInitialProfile(userId, institution.id);
        await this.addressesService.createInitialAddress(userId, institution.id, address);
        return institution;
    }
    async updateInstitutionName(userId, { institutionId, name }) {
        const institution = await this.institutionById(institutionId);
        await this.checkProfile(userId, institution);
        name = this.commonService.formatTitle(name);
        await this.checkExistence(userId, name);
        const slug = await this.generateSlug(name);
        institution.name = name;
        institution.slug = slug;
        await this.commonService.saveEntity(this.institutionsRepository, institution);
        return institution;
    }
    async updateInstitutionDescription(userId, { institutionId, description }) {
        const institution = await this.institutionById(institutionId);
        await this.checkProfile(userId, institution);
        institution.description = description;
        await this.commonService.saveEntity(this.institutionsRepository, institution);
        return institution;
    }
    async updateInstitutionPicture(userId, { institutionId, picture }) {
        const institution = await this.institutionById(institutionId);
        await this.checkProfile(userId, institution);
        const toDelete = institution.picture;
        institution.picture = await this.uploaderService.uploadImage(userId, picture, enums_1.RatioEnum.SQUARE);
        await this.commonService.saveEntity(this.institutionsRepository, institution);
        this.uploaderService.deleteFile(toDelete);
        return institution;
    }
    async deleteInstitution(userId, institutionId) {
        const institution = await this.institutionById(institutionId);
        if (userId !== institution.owner.id)
            throw new common_1.UnauthorizedException('Only the owner can delete his institution');
        await this.commonService.removeEntity(this.institutionsRepository, institution);
        return new gql_1.LocalMessageType('Institution deleted successfully');
    }
    async institutionById(institutionId) {
        const institution = await this.institutionsRepository.findOne({
            id: institutionId,
        });
        this.commonService.checkExistence('Institution', institution);
        return institution;
    }
    async institutionBySlug(slug) {
        const institution = await this.institutionsRepository.findOne({
            slug,
        });
        this.commonService.checkExistence('Institution', institution);
        return institution;
    }
    async searchInstitutions({ institutionType, country, search, cursor, order, first, after, }) {
        const qb = this.institutionsRepository.createQueryBuilder('i');
        if (search) {
            search = this.commonService.formatSearch(search);
            qb.where({
                $or: [
                    {
                        name: {
                            $ilike: search,
                        },
                    },
                    {
                        description: {
                            $ilike: search,
                        },
                    },
                ],
            });
        }
        if (institutionType)
            qb.andWhere({ institutionType });
        if (country) {
            qb.leftJoin('i.addresses', 'a').andWhere({
                addresses: {
                    country,
                },
            });
        }
        return this.commonService.queryBuilderPagination('i', (0, enums_1.getQueryCursor)(cursor), first, order, qb, after, cursor === enums_1.QueryCursorEnum.DATE);
    }
    async ownersInstitutions(userId) {
        const institutions = await this.institutionsRepository.find({
            owner: { id: userId },
        });
        return institutions;
    }
    async usersInstitutions(userId, { search, cursor, order, first, after }) {
        const qb = this.institutionsRepository
            .createQueryBuilder('i')
            .leftJoin('i.profiles', 'p')
            .where({
            profiles: {
                user: userId,
            },
        });
        if (search) {
            search = this.commonService.formatSearch(search);
            qb.where({
                $or: [
                    {
                        name: {
                            $ilike: search,
                        },
                    },
                    {
                        description: {
                            $ilike: search,
                        },
                    },
                ],
            });
        }
        return this.commonService.queryBuilderPagination('i', (0, enums_1.getQueryCursor)(cursor), first, order, qb, after, cursor === enums_1.QueryCursorEnum.DATE);
    }
    async checkExistence(userId, name) {
        const count = await this.institutionsRepository.count({
            owner: userId,
            name,
        });
        if (count > 0) {
            throw new common_1.BadRequestException('Institution with this name already exists');
        }
    }
    async generateSlug(name) {
        const slug = this.commonService.generatePointSlug(name);
        const count = await this.institutionsRepository.count({
            slug: {
                $like: `${slug}%`,
            },
        });
        if (count > 0)
            return slug + count.toString();
        return slug;
    }
    async checkProfile(userId, institution) {
        if (institution.owner.id !== userId) {
            const profile = await this.profilesService.profileByRelations(userId, institution.id);
            if (profile.role === enums_1.ProfileRoleEnum.ADMIN)
                return;
        }
        throw new common_1.UnauthorizedException('You are not allowed edit this institution');
    }
};
InstitutionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_1.InjectRepository)(institution_entity_1.InstitutionEntity)),
    __metadata("design:paramtypes", [postgresql_1.EntityRepository,
        common_2.CommonService,
        uploader_1.UploaderService,
        profiles_service_1.ProfilesService,
        addresses_service_1.AddressesService])
], InstitutionsService);
exports.InstitutionsService = InstitutionsService;
//# sourceMappingURL=institutions.service.js.map