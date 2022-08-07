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
var LoadersService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadersService = void 0;
const postgresql_1 = require("@mikro-orm/postgresql");
const common_1 = require("@nestjs/common");
const common_2 = require("../common");
const address_entity_1 = require("../addresses/entities/address.entity");
const institution_entity_1 = require("../institutions/entities/institution.entity");
const invitation_entity_1 = require("../profiles/entities/invitation.entity");
const profile_request_entity_1 = require("../profiles/entities/profile-request.entity");
const profile_entity_1 = require("../profiles/entities/profile.entity");
const user_entity_1 = require("../users/entities/user.entity");
let LoadersService = LoadersService_1 = class LoadersService {
    constructor(em, commonService) {
        this.em = em;
        this.commonService = commonService;
    }
    static getEntities(items) {
        const entities = [];
        for (let i = 0; i < items.length; i++) {
            entities.push(items[i].obj);
        }
        return entities;
    }
    static getEntityIds(items) {
        const ids = [];
        for (let i = 0; i < items.length; i++) {
            const id = items[i].obj.id;
            ids.push(typeof id === 'string' ? parseInt(id, 10) : id);
        }
        return ids;
    }
    static getRelationIds(items, relationName) {
        const ids = [];
        for (let i = 0; i < items.length; i++) {
            ids.push(items[i].obj[relationName].id);
        }
        return ids;
    }
    static getEntityMap(entities) {
        const map = new Map();
        for (let i = 0; i < entities.length; i++) {
            const entity = entities[i];
            map.set(entity.id, entity);
        }
        return map;
    }
    static getResults(ids, map, defaultValue = null) {
        var _a;
        const results = [];
        for (let i = 0; i < ids.length; i++) {
            results.push((_a = map.get(ids[i])) !== null && _a !== void 0 ? _a : defaultValue);
        }
        return results;
    }
    getLoaders() {
        return {
            User: {
                __resolveReference: this.loadUsersReferences(),
                profiles: this.loadUserProfiles(),
                institutions: this.loadUsersInstitutions(),
            },
            InstitutionProfile: {
                __resolveReference: this.loadProfilesReferences(),
                user: this.loadProfilesUser(),
                institution: this.loadProfilesInstitution(),
            },
            Invitation: {
                __resolveReference: this.loadInvitationsReferences(),
                institution: this.loadInvitationsInstitution(),
                sender: this.loadInvitationsSender(),
            },
            ProfileRequest: {
                __resolveReference: this.loadProfileRequestsReferences(),
                institution: this.loadProfileRequestsInstitution(),
                sender: this.loadProfileRequestsSender(),
                recipient: this.loadProfileRequestsRecipient(),
            },
            Institution: {
                __resolveReference: this.loadInstitutionsReferences(),
                owner: this.loadInstitutionsOwner(),
                profiles: this.loadInstitutionsProfiles(),
                addresses: this.loadInstitutionsAddresses(),
            },
            Address: {
                __resolveReference: this.loadAddressesReferences(),
                institution: this.loadAddressesInstitution(),
                author: this.loadAddressesAuthor(),
            },
        };
    }
    loadUsersReferences() {
        return async (items, _) => {
            return this.loadReferences(items, user_entity_1.UserEntity);
        };
    }
    loadUserProfiles() {
        return async (items, _) => {
            return this.basicPaginator(items, user_entity_1.UserEntity, profile_entity_1.ProfileEntity, 'profiles', 'user', 'id');
        };
    }
    loadUsersInstitutions() {
        return async (items, _) => {
            return this.basicPaginator(items, user_entity_1.UserEntity, institution_entity_1.InstitutionEntity, 'institutions', 'owner', 'slug');
        };
    }
    loadProfilesReferences() {
        return async (items, _) => {
            return this.loadReferences(items, profile_entity_1.ProfileEntity);
        };
    }
    loadProfilesUser() {
        return async (items, _) => {
            if (items.length === 0)
                return [];
            const ids = LoadersService_1.getRelationIds(items, 'user');
            const users = await this.em.find(user_entity_1.UserEntity, {
                id: {
                    $in: ids,
                },
            });
            const map = LoadersService_1.getEntityMap(users);
            return LoadersService_1.getResults(ids, map);
        };
    }
    loadProfilesInstitution() {
        return async (items, _) => {
            if (items.length === 0)
                return [];
            const ids = LoadersService_1.getRelationIds(items, 'institution');
            const institutions = await this.em.find(institution_entity_1.InstitutionEntity, {
                id: {
                    $in: ids,
                },
            });
            const map = LoadersService_1.getEntityMap(institutions);
            return LoadersService_1.getResults(ids, map);
        };
    }
    loadInstitutionsReferences() {
        return async (items, _) => {
            return this.loadReferences(items, institution_entity_1.InstitutionEntity);
        };
    }
    loadInstitutionsOwner() {
        return async (items, _) => {
            if (items.length === 0)
                return [];
            const ids = LoadersService_1.getRelationIds(items, 'owner');
            const users = await this.em.find(user_entity_1.UserEntity, {
                id: {
                    $in: ids,
                },
            });
            const map = LoadersService_1.getEntityMap(users);
            return LoadersService_1.getResults(ids, map);
        };
    }
    loadInstitutionsAddresses() {
        return async (items, _) => {
            if (items.length === 0)
                return [];
            const entities = LoadersService_1.getEntities(items);
            await this.em.populate(entities, ['addresses']);
            return entities.map((entity) => entity.addresses.getItems());
        };
    }
    loadInstitutionsProfiles() {
        return async (items, _) => {
            return this.basicPaginator(items, institution_entity_1.InstitutionEntity, profile_entity_1.ProfileEntity, 'profiles', 'institution', 'slug');
        };
    }
    loadInvitationsReferences() {
        return async (items, _) => {
            return this.loadReferences(items, invitation_entity_1.InvitationEntity);
        };
    }
    loadInvitationsInstitution() {
        return async (items, _) => {
            if (items.length === 0)
                return [];
            const ids = LoadersService_1.getRelationIds(items, 'institution');
            const institutions = await this.em.find(institution_entity_1.InstitutionEntity, {
                id: {
                    $in: ids,
                },
            });
            const map = LoadersService_1.getEntityMap(institutions);
            return LoadersService_1.getResults(ids, map);
        };
    }
    loadInvitationsSender() {
        return async (items, _) => {
            if (items.length === 0)
                return [];
            const ids = LoadersService_1.getRelationIds(items, 'sender');
            const users = await this.em.find(user_entity_1.UserEntity, {
                id: {
                    $in: ids,
                },
            });
            const map = LoadersService_1.getEntityMap(users);
            return LoadersService_1.getResults(ids, map);
        };
    }
    loadProfileRequestsReferences() {
        return async (items, _) => {
            return this.loadReferences(items, profile_request_entity_1.ProfileRequestEntity);
        };
    }
    loadProfileRequestsInstitution() {
        return async (items, _) => {
            if (items.length === 0)
                return [];
            const ids = LoadersService_1.getRelationIds(items, 'institution');
            const institutions = await this.em.find(institution_entity_1.InstitutionEntity, {
                id: {
                    $in: ids,
                },
            });
            const map = LoadersService_1.getEntityMap(institutions);
            return LoadersService_1.getResults(ids, map);
        };
    }
    loadProfileRequestsRecipient() {
        return async (items, _) => {
            if (items.length === 0)
                return [];
            const ids = LoadersService_1.getRelationIds(items, 'recipient');
            const users = await this.em.find(user_entity_1.UserEntity, {
                id: {
                    $in: ids,
                },
            });
            const map = LoadersService_1.getEntityMap(users);
            return LoadersService_1.getResults(ids, map);
        };
    }
    loadProfileRequestsSender() {
        return async (items, _) => {
            if (items.length === 0)
                return [];
            const ids = LoadersService_1.getRelationIds(items, 'sender');
            const users = await this.em.find(user_entity_1.UserEntity, {
                id: {
                    $in: ids,
                },
            });
            const map = LoadersService_1.getEntityMap(users);
            return LoadersService_1.getResults(ids, map);
        };
    }
    loadAddressesReferences() {
        return async (items, _) => {
            return this.loadReferences(items, address_entity_1.AddressEntity);
        };
    }
    loadAddressesInstitution() {
        return async (items, _) => {
            if (items.length === 0)
                return [];
            const ids = LoadersService_1.getRelationIds(items, 'institution');
            const institutions = await this.em.find(institution_entity_1.InstitutionEntity, {
                id: {
                    $in: ids,
                },
            });
            const map = LoadersService_1.getEntityMap(institutions);
            return LoadersService_1.getResults(ids, map);
        };
    }
    loadAddressesAuthor() {
        return async (items, _) => {
            if (items.length === 0)
                return [];
            const ids = LoadersService_1.getRelationIds(items, 'author');
            const users = await this.em.find(user_entity_1.UserEntity, {
                id: {
                    $in: ids,
                },
            });
            const map = LoadersService_1.getEntityMap(users);
            return LoadersService_1.getResults(ids, map);
        };
    }
    async loadReferences(items, entity) {
        const len = items.length;
        if (len === 0)
            return [];
        if (len === 1) {
            return [
                await this.em.findOne(entity, {
                    id: parseInt(items[0].obj.id, 10),
                }),
            ];
        }
        const ids = LoadersService_1.getEntityIds(items);
        const entities = await this.em.find(entity, {
            id: {
                $in: ids,
            },
        });
        const map = LoadersService_1.getEntityMap(entities);
        return LoadersService_1.getResults(ids, map);
    }
    async basicPaginator(data, parent, child, parentRelation, childRelation, cursor) {
        if (data.length === 0)
            return [];
        const { first, order } = data[0].params;
        const parentId = 'p.id';
        const childAlias = 'c';
        const childId = 'c.id';
        const knex = this.em.getKnex();
        const parentRef = knex.ref(parentId);
        const parentRel = String(parentRelation);
        const ids = LoadersService_1.getEntityIds(data);
        const countQuery = this.em
            .createQueryBuilder(child, childAlias)
            .count(childId)
            .where({
            [childRelation]: parentRef,
        })
            .as('count');
        const entitiesQuery = this.em
            .createQueryBuilder(child, childAlias)
            .select(`${childAlias}.id`)
            .where({
            [childRelation]: {
                id: parentRef,
            },
        })
            .orderBy({ [cursor]: order })
            .limit(first)
            .getKnexQuery();
        const results = await this.em
            .createQueryBuilder(parent, 'p')
            .select([parentId, countQuery])
            .leftJoinAndSelect(`p.${parentRel}`, childAlias)
            .groupBy([parentId, childId])
            .where({
            id: { $in: ids },
            [parentRelation]: { $in: entitiesQuery },
        })
            .orderBy({ [parentRelation]: { [cursor]: order } })
            .getResult();
        const map = new Map();
        for (let i = 0; i < results.length; i++) {
            const result = results[i];
            map.set(result.id, this.commonService.paginate(result[parentRelation].getItems(), result.count, 0, cursor, first));
        }
        return LoadersService_1.getResults(ids, map, this.commonService.paginate([], 0, 0, cursor, first));
    }
};
LoadersService = LoadersService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [postgresql_1.EntityManager,
        common_2.CommonService])
], LoadersService);
exports.LoadersService = LoadersService;
//# sourceMappingURL=loaders.service.js.map