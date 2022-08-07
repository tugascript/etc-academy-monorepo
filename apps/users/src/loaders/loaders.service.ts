import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable, Type } from '@nestjs/common';
import { MercuriusContext } from 'mercurius';
import { CommonService } from 'src/common';
import { FilterRelationDto } from 'src/common/dtos';
import { IBase, ILoader, IPaginated, IReference } from 'src/common/interfaces';
import { AddressEntity } from '../addresses/entities/address.entity';
import { InstitutionEntity } from '../institutions/entities/institution.entity';
import { InvitationEntity } from '../profiles/entities/invitation.entity';
import { ProfileRequestEntity } from '../profiles/entities/profile-request.entity';
import { ProfileEntity } from '../profiles/entities/profile.entity';
import { UserEntity } from '../users/entities/user.entity';
import { IAddressReference } from './interfaces/address-reference.interface';
import { IInstitutionReference } from './interfaces/institution-reference.interface';
import { IInvitationReference } from './interfaces/invitation-reference.interface';
import { IProfileReference } from './interfaces/profile-reference.interface';
import { IProfileRequestReference } from './interfaces/profile-request-reference.interface';
import { IUserReference } from './interfaces/user-reference.interface';

@Injectable()
export class LoadersService {
  constructor(
    private readonly em: EntityManager,
    private readonly commonService: CommonService,
  ) {}

  /**
   * Get Entities
   *
   * Maps the entity object to the entity itself.
   */
  private static getEntities<T extends IBase, P = undefined>(
    items: ILoader<T, P>[],
  ): T[] {
    const entities: T[] = [];

    for (let i = 0; i < items.length; i++) {
      entities.push(items[i].obj);
    }

    return entities;
  }

  /**
   * Get Entity IDs
   *
   * Maps the entity object to an array of IDs.
   */
  private static getEntityIds<T extends IBase | IReference, P = undefined>(
    items: ILoader<T, P>[],
  ): number[] {
    const ids: number[] = [];

    for (let i = 0; i < items.length; i++) {
      const id = items[i].obj.id;
      ids.push(typeof id === 'string' ? parseInt(id, 10) : id);
    }

    return ids;
  }

  /**
   * Get Relation IDs
   *
   * Maps the entity object many-to-one relation to an array of IDs.
   */
  private static getRelationIds<T extends IBase, P = undefined>(
    items: ILoader<T, P>[],
    relationName: string,
  ): number[] {
    const ids: number[] = [];

    for (let i = 0; i < items.length; i++) {
      ids.push(items[i].obj[relationName].id);
    }

    return ids;
  }

  /**
   * Get Entity Map
   *
   * Turns an array of entity objects to a map of entity objects
   * with its ID as the key.
   */
  private static getEntityMap<T extends IBase>(entities: T[]): Map<number, T> {
    const map = new Map<number, T>();

    for (let i = 0; i < entities.length; i++) {
      const entity = entities[i];
      map.set(entity.id, entity);
    }

    return map;
  }

  /**
   * Get Results
   *
   * With the IDs of the relation id array, gets the results of the map.
   */
  private static getResults<T>(
    ids: number[],
    map: Map<number, T>,
    defaultValue: T | null = null,
  ): T[] {
    const results: T[] = [];

    for (let i = 0; i < ids.length; i++) {
      results.push(map.get(ids[i]) ?? defaultValue);
    }

    return results;
  }

  public getLoaders() {
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

  private loadUsersReferences() {
    return async (
      items: ILoader<IUserReference>[],
      _: MercuriusContext,
    ): Promise<UserEntity[]> => {
      return this.loadReferences(items, UserEntity);
    };
  }

  private loadUserProfiles() {
    return async (
      items: ILoader<UserEntity, FilterRelationDto>[],
      _: MercuriusContext,
    ): Promise<IPaginated<ProfileEntity>[]> => {
      return this.basicPaginator(
        items,
        UserEntity,
        ProfileEntity,
        'profiles',
        'user',
        'id',
      );
    };
  }

  private loadUsersInstitutions() {
    return async (
      items: ILoader<UserEntity, FilterRelationDto>[],
      _: MercuriusContext,
    ): Promise<IPaginated<InstitutionEntity>[]> => {
      return this.basicPaginator(
        items,
        UserEntity,
        InstitutionEntity,
        'institutions',
        'owner',
        'slug',
      );
    };
  }

  private loadProfilesReferences() {
    return async (
      items: ILoader<IProfileReference>[],
      _: MercuriusContext,
    ): Promise<ProfileEntity[]> => {
      return this.loadReferences(items, ProfileEntity);
    };
  }

  private loadProfilesUser() {
    return async (
      items: ILoader<ProfileEntity>[],
      _: MercuriusContext,
    ): Promise<UserEntity[]> => {
      if (items.length === 0) return [];
      const ids = LoadersService.getRelationIds(items, 'user');
      const users = await this.em.find(UserEntity, {
        id: {
          $in: ids,
        },
      });
      const map = LoadersService.getEntityMap(users);
      return LoadersService.getResults(ids, map);
    };
  }

  private loadProfilesInstitution() {
    return async (
      items: ILoader<ProfileEntity>[],
      _: MercuriusContext,
    ): Promise<InstitutionEntity[]> => {
      if (items.length === 0) return [];
      const ids = LoadersService.getRelationIds(items, 'institution');
      const institutions = await this.em.find(InstitutionEntity, {
        id: {
          $in: ids,
        },
      });
      const map = LoadersService.getEntityMap(institutions);
      return LoadersService.getResults(ids, map);
    };
  }

  private loadInstitutionsReferences() {
    return async (
      items: ILoader<IInstitutionReference>[],
      _: MercuriusContext,
    ): Promise<InstitutionEntity[]> => {
      return this.loadReferences(items, InstitutionEntity);
    };
  }

  private loadInstitutionsOwner() {
    return async (
      items: ILoader<InstitutionEntity>[],
      _: MercuriusContext,
    ): Promise<UserEntity[]> => {
      if (items.length === 0) return [];
      const ids = LoadersService.getRelationIds(items, 'owner');
      const users = await this.em.find(UserEntity, {
        id: {
          $in: ids,
        },
      });
      const map = LoadersService.getEntityMap(users);
      return LoadersService.getResults(ids, map);
    };
  }

  private loadInstitutionsAddresses() {
    return async (
      items: ILoader<InstitutionEntity>[],
      _: MercuriusContext,
    ): Promise<AddressEntity[][]> => {
      if (items.length === 0) return [];
      const entities = LoadersService.getEntities(items);
      await this.em.populate(entities, ['addresses']);
      return entities.map((entity) => entity.addresses.getItems());
    };
  }

  private loadInstitutionsProfiles() {
    return async (
      items: ILoader<InstitutionEntity, FilterRelationDto>[],
      _: MercuriusContext,
    ): Promise<IPaginated<ProfileEntity>[]> => {
      return this.basicPaginator(
        items,
        InstitutionEntity,
        ProfileEntity,
        'profiles',
        'institution',
        'slug',
      );
    };
  }

  private loadInvitationsReferences() {
    return async (
      items: ILoader<IInvitationReference>[],
      _: MercuriusContext,
    ): Promise<InvitationEntity[]> => {
      return this.loadReferences(items, InvitationEntity);
    };
  }

  private loadInvitationsInstitution() {
    return async (
      items: ILoader<InvitationEntity>[],
      _: MercuriusContext,
    ): Promise<InstitutionEntity[]> => {
      if (items.length === 0) return [];
      const ids = LoadersService.getRelationIds(items, 'institution');
      const institutions = await this.em.find(InstitutionEntity, {
        id: {
          $in: ids,
        },
      });
      const map = LoadersService.getEntityMap(institutions);
      return LoadersService.getResults(ids, map);
    };
  }

  private loadInvitationsSender() {
    return async (
      items: ILoader<InvitationEntity>[],
      _: MercuriusContext,
    ): Promise<UserEntity[]> => {
      if (items.length === 0) return [];
      const ids = LoadersService.getRelationIds(items, 'sender');
      const users = await this.em.find(UserEntity, {
        id: {
          $in: ids,
        },
      });
      const map = LoadersService.getEntityMap(users);
      return LoadersService.getResults(ids, map);
    };
  }

  private loadProfileRequestsReferences() {
    return async (
      items: ILoader<IProfileRequestReference>[],
      _: MercuriusContext,
    ): Promise<ProfileRequestEntity[]> => {
      return this.loadReferences(items, ProfileRequestEntity);
    };
  }

  private loadProfileRequestsInstitution() {
    return async (
      items: ILoader<ProfileRequestEntity>[],
      _: MercuriusContext,
    ): Promise<InstitutionEntity[]> => {
      if (items.length === 0) return [];
      const ids = LoadersService.getRelationIds(items, 'institution');
      const institutions = await this.em.find(InstitutionEntity, {
        id: {
          $in: ids,
        },
      });
      const map = LoadersService.getEntityMap(institutions);
      return LoadersService.getResults(ids, map);
    };
  }

  private loadProfileRequestsRecipient() {
    return async (
      items: ILoader<ProfileRequestEntity>[],
      _: MercuriusContext,
    ): Promise<UserEntity[]> => {
      if (items.length === 0) return [];
      const ids = LoadersService.getRelationIds(items, 'recipient');
      const users = await this.em.find(UserEntity, {
        id: {
          $in: ids,
        },
      });
      const map = LoadersService.getEntityMap(users);
      return LoadersService.getResults(ids, map);
    };
  }

  private loadProfileRequestsSender() {
    return async (
      items: ILoader<ProfileRequestEntity>[],
      _: MercuriusContext,
    ): Promise<UserEntity[]> => {
      if (items.length === 0) return [];
      const ids = LoadersService.getRelationIds(items, 'sender');
      const users = await this.em.find(UserEntity, {
        id: {
          $in: ids,
        },
      });
      const map = LoadersService.getEntityMap(users);
      return LoadersService.getResults(ids, map);
    };
  }

  private loadAddressesReferences() {
    return async (
      items: ILoader<IAddressReference>[],
      _: MercuriusContext,
    ): Promise<AddressEntity[]> => {
      return this.loadReferences(items, AddressEntity);
    };
  }

  private loadAddressesInstitution() {
    return async (
      items: ILoader<AddressEntity>[],
      _: MercuriusContext,
    ): Promise<InstitutionEntity[]> => {
      if (items.length === 0) return [];
      const ids = LoadersService.getRelationIds(items, 'institution');
      const institutions = await this.em.find(InstitutionEntity, {
        id: {
          $in: ids,
        },
      });
      const map = LoadersService.getEntityMap(institutions);
      return LoadersService.getResults(ids, map);
    };
  }

  private loadAddressesAuthor() {
    return async (
      items: ILoader<AddressEntity>[],
      _: MercuriusContext,
    ): Promise<UserEntity[]> => {
      if (items.length === 0) return [];
      const ids = LoadersService.getRelationIds(items, 'author');
      const users = await this.em.find(UserEntity, {
        id: {
          $in: ids,
        },
      });
      const map = LoadersService.getEntityMap(users);
      return LoadersService.getResults(ids, map);
    };
  }

  private async loadReferences<T extends IReference, E extends IBase>(
    items: ILoader<T>[],
    entity: Type<E>,
  ): Promise<E[]> {
    const len = items.length;

    if (len === 0) return [];
    if (len === 1) {
      return [
        await this.em.findOne(entity, {
          id: parseInt(items[0].obj.id, 10),
        }),
      ];
    }

    const ids = LoadersService.getEntityIds(items);
    const entities = await this.em.find(entity, {
      id: {
        $in: ids,
      },
    });
    const map = LoadersService.getEntityMap(entities);
    return LoadersService.getResults(ids, map);
  }

  /**
   * Basic Paginator
   *
   * Loads paginated one-to-many relationships
   */
  private async basicPaginator<T extends IBase, C extends IBase>(
    data: ILoader<T, FilterRelationDto>[],
    parent: Type<T>,
    child: Type<C>,
    parentRelation: keyof T,
    childRelation: keyof C,
    cursor: keyof C,
  ): Promise<IPaginated<C>[]> {
    if (data.length === 0) return [];

    const { first, order } = data[0].params;
    const parentId = 'p.id';
    const childAlias = 'c';
    const childId = 'c.id';
    const knex = this.em.getKnex();
    const parentRef = knex.ref(parentId);
    const parentRel = String(parentRelation);
    const ids = LoadersService.getEntityIds(data);

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
    const map = new Map<number, IPaginated<C>>();

    for (let i = 0; i < results.length; i++) {
      const result = results[i];

      map.set(
        result.id,
        this.commonService.paginate(
          result[parentRelation].getItems(),
          result.count,
          0,
          cursor,
          first,
        ),
      );
    }

    return LoadersService.getResults(
      ids,
      map,
      this.commonService.paginate([], 0, 0, cursor, first),
    );
  }
}
