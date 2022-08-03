import { Injectable } from '@nestjs/common';
import { IBase, ILoader, IReference } from 'app/common/interfaces';
import { EntityManager } from '@mikro-orm/postgresql';
import { IUserReference } from './interfaces/user-reference.interface';
import { UserEntity } from '../users/entities/user.entity';
import { MercuriusContext } from 'mercurius';

@Injectable()
export class LoadersService {
  constructor(private readonly em: EntityManager) {}

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
  private static getResults<T>(ids: number[], map: Map<number, T>): T[] {
    const results: T[] = [];

    for (let i = 0; i < ids.length; i++) {
      results.push(map.get(ids[i]));
    }

    return results;
  }

  public getLoaders() {
    return {
      User: {
        __resolveReference: this.loadUsersReferences(),
      },
    };
  }

  private loadUsersReferences() {
    return async (
      items: ILoader<IUserReference>[],
      _: MercuriusContext,
    ): Promise<UserEntity[]> => {
      const len = items.length;

      if (len === 0) return [];
      if (len === 1) {
        return [
          await this.em.findOne(UserEntity, {
            id: parseInt(items[0].obj.id, 10),
          }),
        ];
      }

      const ids = LoadersService.getEntityIds(items);
      const users = await this.em.find(UserEntity, {
        id: {
          $in: ids,
        },
      });
      const map = LoadersService.getEntityMap(users);
      return LoadersService.getResults(ids, map);
    };
  }
}
