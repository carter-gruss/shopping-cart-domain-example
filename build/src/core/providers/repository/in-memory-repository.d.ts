import { DeleteDataResult } from '../data-access';
import { ObjectKeyOf } from '../../util/object';
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
    findAll(): Promise<T[]>;
    /**
     * Find a single entity by a property
     */
    findBy<Prop extends ObjectKeyOf<T>>(property: Prop, value: T[Prop]): Promise<T | null>;
    /**
     * Find a single entity by a property.
     * If no entity is found, an exception is thrown
     */
    findByOrFail<Prop extends ObjectKeyOf<T>>(property: Prop, value: T[Prop]): Promise<T>;
    /**
     * Find all entities matching a property
     */
    findEntitiesBy<Prop extends ObjectKeyOf<T>>(property: Prop, value: T[Prop]): Promise<T[]>;
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
/**
 *
 */
export declare class InMemoryRepository<Entity extends AbstractEntityObject> implements DataAccessObject<Entity> {
    private _inMemoryRepository;
    constructor(entities: Entity[]);
    findAll(): Promise<Entity[]>;
    findBy<Prop extends keyof Entity>(property: Prop, value: Entity[Prop]): Promise<Entity | null>;
    findByOrFail<Prop extends keyof Entity>(property: Prop, value: Entity[Prop]): Promise<Entity>;
    findEntitiesBy<Prop extends keyof Entity>(property: Prop, value: Entity[Prop]): Promise<Entity[]>;
    addEntity(entity: Entity): Promise<Entity | null>;
    updateEntity(entityID: number, entity: Entity): Promise<Entity | null>;
    deleteEntity(entityID: number): Promise<DeleteDataResult>;
    dropAllEntities(): Promise<DeleteDataResult>;
    private _findBy;
    private _findIndexBy;
}
export {};
