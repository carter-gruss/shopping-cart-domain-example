"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryRepository = void 0;
const data_not_found_exception_1 = require("../../../common/exceptions/data-not-found.exception");
/**
 *
 */
class InMemoryRepository {
    constructor(entities) {
        this._inMemoryRepository = [];
        this._inMemoryRepository = entities;
    }
    findAll() {
        return new Promise(resolve => {
            resolve(this._inMemoryRepository);
        });
    }
    async findBy(property, value) {
        const entity = await this._findBy(property, value);
        return new Promise(resolve => {
            resolve(entity);
        });
    }
    findByOrFail(property, value) {
        return new Promise(resolve => {
            const entity = this._inMemoryRepository.find(entity => {
                const entityValue = entity[property];
                return entityValue === value;
            });
            if (!entity) {
                throw new data_not_found_exception_1.DataNotFoundException(`Entity with a property of ${property} matching ${value} does not exist.`);
            }
            resolve(entity);
        });
    }
    findEntitiesBy(property, value) {
        return new Promise(resolve => {
            const entities = this._inMemoryRepository.filter(entity => {
                const entityValue = entity[property];
                return entityValue === value;
            });
            resolve(entities);
        });
    }
    addEntity(entity) {
        let length = this._inMemoryRepository.length;
        return new Promise(resolve => {
            entity.id = length++;
            this._inMemoryRepository.push(entity);
            resolve(entity);
        });
    }
    async updateEntity(entityID, entity) {
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
    async deleteEntity(entityID) {
        const id = Number(entityID);
        return new Promise(resolve => {
            const indexToDelete = this._inMemoryRepository.findIndex(book => book.id === id);
            if (indexToDelete === -1) {
                throw new data_not_found_exception_1.DataNotFoundException(`Entity with an matching ${id} does not exist.`);
            }
            this._inMemoryRepository.splice(1, indexToDelete);
            resolve({
                affected: 1,
                status: 'success',
            });
        });
    }
    dropAllEntities() {
        return new Promise(resolve => {
            const count = this._inMemoryRepository.length;
            this._inMemoryRepository = [];
            resolve({
                affected: count,
                status: 'success',
            });
        });
    }
    _findBy(property, value) {
        return new Promise(resolve => {
            const entity = this._inMemoryRepository.find(entity => {
                const entityValue = entity[property];
                return entityValue === value;
            }) || null;
            resolve(entity);
        });
    }
    _findIndexBy(property, value) {
        return new Promise(resolve => {
            const idx = this._inMemoryRepository.findIndex(entity => {
                const entityValue = entity[property];
                return entityValue === value;
            });
            resolve(idx);
        });
    }
}
exports.InMemoryRepository = InMemoryRepository;
//# sourceMappingURL=in-memory-repository.js.map