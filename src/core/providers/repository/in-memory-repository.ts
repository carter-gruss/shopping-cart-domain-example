import {DataNotFoundException} from '../../../common/exceptions/data-not-found.exception';
import {DeleteDataResult} from '../data-access';
import {ObjectKeyOf} from '../../util/object';

/**
 * Data Access Object
 *
 * Abstracts access to the underlying data implementation
 * for object entities.
 */
interface DataAccessObject<T> {
  /**
   * Returns an array of all entities in the system
   */
  findAllEntities(): Promise<T[]>;

  /**
   * Find a single entity by a property
   */
  findEntityBy<Prop extends ObjectKeyOf<T>>(
    property: Prop,
    value: T[Prop]
  ): Promise<T | null>;

  /**
   * Find a single entity by a property.
   * If no entity is found, an exception is thrown
   */
  findByOrFail<Prop extends ObjectKeyOf<T>>(
    property: Prop,
    value: T[Prop]
  ): Promise<T>;

  /**
   * Find all entities matching a property
   */
  findEntitiesBy<Prop extends ObjectKeyOf<T>>(
    property: Prop,
    value: T[Prop]
  ): Promise<T[]>;

  /**
   * Inserts a new entity into the system
   */
  addEntity(entity: T): Promise<T | null>;

  /**
   * Updates an entity in the system; if no
   * existing enity is found, a new one is created
   */
  updateEntity(entityID: number, entity: T): Promise<T | null>;

  /**
   * Removes an entity from the system based on the id
   */
  deleteEntity(id: number): Promise<DeleteDataResult>;

  /**
   * Drops all entities from the system
   */
  dropAllEntities(): Promise<DeleteDataResult>;
}

interface AbstractEntityObject {
  id: number | string;
}

export interface InMemoryRepository<Entity extends AbstractEntityObject> {
  inMemoryStore: InMemoryStore<Entity>;
}

/**
 *
 */
export class InMemoryStore<Entity extends AbstractEntityObject>
  implements DataAccessObject<Entity> {
  private _inMemoryRepository: Entity[] = [];

  constructor(entities: Entity[]) {
    this._inMemoryRepository = entities.slice(0);
  }

  async findAllEntities(): Promise<Entity[]> {
    return new Promise(resolve => {
      resolve(this._inMemoryRepository);
    });
  }

  async findEntityBy<Prop extends keyof Entity>(
    property: Prop,
    value: Entity[Prop]
  ): Promise<Entity | null> {
    const entity = await this._findBy(property, value);
    return new Promise(resolve => {
      resolve(entity);
    });
  }

  async findByOrFail<Prop extends keyof Entity>(
    property: Prop,
    value: Entity[Prop]
  ): Promise<Entity> {
    return new Promise(resolve => {
      const entity = this._inMemoryRepository.find(entity => {
        const entityValue = entity[property];
        return entityValue === value;
      });

      if (!entity) {
        throw new DataNotFoundException(
          `Entity with a property of ${property} matching ${value} does not exist.`
        );
      }

      resolve(entity);
    });
  }

  async findEntitiesBy<Prop extends keyof Entity>(
    property: Prop,
    value: Entity[Prop]
  ): Promise<Entity[]> {
    return new Promise(resolve => {
      const entities = this._inMemoryRepository.filter(entity => {
        const entityValue = entity[property];
        return entityValue === value;
      });

      resolve(entities);
    });
  }

  async addEntity(entity: Entity): Promise<Entity | null> {
    let length = this._inMemoryRepository.length;
    return new Promise(resolve => {
      entity.id = length++;
      this._inMemoryRepository.push(entity);
      resolve(entity);
    });
  }

  async updateEntity(entityID: number, entity: Entity): Promise<Entity | null> {
    const id = Number(entityID);
    const length = this._inMemoryRepository.length;
    const index = await this._findIndexBy('id', id);
    // If an existing entity was not found, add the entity
    // as a new one
    if (index < 0) {
      const id = length + 1;
      entity.id = id;
      this._inMemoryRepository.push(entity);
      return entity;
    }

    this._inMemoryRepository[index] = entity;
    return entity;
  }

  async deleteEntity(entityID: number): Promise<DeleteDataResult> {
    const id = Number(entityID);
    return new Promise(resolve => {
      const indexToDelete = this._inMemoryRepository.findIndex(
        book => book.id === id
      );

      if (indexToDelete === -1) {
        throw new DataNotFoundException(
          `Entity with an matching id ${id} does not exist.`
        );
      }

      this._inMemoryRepository.splice(indexToDelete, 1);

      resolve({
        affected: 1,
        status: 'success',
      });
    });
  }

  async dropAllEntities(): Promise<DeleteDataResult> {
    return new Promise(resolve => {
      const count = this._inMemoryRepository.length;
      this._inMemoryRepository = [];
      resolve({
        affected: count,
        status: 'success',
      });
    });
  }

  private async _findBy<Prop extends ObjectKeyOf<Entity>>(
    property: Prop,
    value: Entity[Prop]
  ): Promise<Entity | null> {
    return new Promise(resolve => {
      const entity =
        this._inMemoryRepository.find(entity => {
          const entityValue = entity[property];
          return entityValue === value;
        }) || null;
      resolve(entity);
    });
  }

  private async _findIndexBy<Prop extends ObjectKeyOf<Entity>>(
    property: Prop,
    value: Entity[Prop]
  ): Promise<number> {
    return new Promise(resolve => {
      const idx = this._inMemoryRepository.findIndex(entity => {
        const entityValue = entity[property];
        return entityValue === value;
      });
      resolve(idx);
    });
  }
}
