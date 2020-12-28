"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_not_found_exception_1 = require("../../../common/exceptions/data-not-found.exception");
const in_memory_repository_1 = require("./in-memory-repository");
describe('InMemoryRepository', () => {
    let repository;
    beforeEach(async () => {
        repository = new in_memory_repository_1.InMemoryRepository([]);
    });
    it('should be defined', () => {
        expect(repository).toBeDefined();
    });
    // ----------------------------------------------------------------------------
    // Find All Entities
    // ----------------------------------------------------------------------------
    describe('findAll', () => {
        it('should return an array when no entity is available', async () => {
            const testData = [];
            repository = new in_memory_repository_1.InMemoryRepository(testData);
            const entities = await repository.findAll();
            expect(entities).toBeInstanceOf(Array);
            expect(entities).toBe(testData);
        });
        it('should return an array when one entity is available', async () => {
            const testData = [
                {
                    id: 2,
                    value: 'test',
                },
            ];
            repository = new in_memory_repository_1.InMemoryRepository(testData);
            const entities = await repository.findAll();
            expect(entities).toBeInstanceOf(Array);
            expect(entities).toBe(testData);
        });
    });
    // ----------------------------------------------------------------------------
    // Get Entity By Id
    // ----------------------------------------------------------------------------
    describe('findBy', () => {
        it('should be able to find an entity by its numeric id', async () => {
            const data = {
                id: 2,
                value: 'TEST',
            };
            repository = new in_memory_repository_1.InMemoryRepository([data]);
            const entity = await repository.findBy('id', 2);
            expect(entity).toBeDefined();
            expect(entity === null || entity === void 0 ? void 0 : entity.id).toBe(2);
            expect(entity === null || entity === void 0 ? void 0 : entity.value).toBe(data === null || data === void 0 ? void 0 : data.value);
        });
        it('should return a single entity whose value matches', async () => {
            const data = {
                id: 2,
                value: 'TEST',
            };
            repository = new in_memory_repository_1.InMemoryRepository([data]);
            const entity = await repository.findBy('value', 'TEST');
            expect(entity).toBeDefined();
            expect(entity === null || entity === void 0 ? void 0 : entity.id).toBe(2);
            expect(entity === null || entity === void 0 ? void 0 : entity.value).toBe(data === null || data === void 0 ? void 0 : data.value);
        });
    });
    // ----------------------------------------------------------------------------
    // Get Entity By Id Or Fail
    // ----------------------------------------------------------------------------
    describe('findBy', () => {
        it('should be able to find an entity by its numeric id', async () => {
            const data = {
                id: 2,
                value: 'TEST',
            };
            repository = new in_memory_repository_1.InMemoryRepository([data]);
            const entity = await repository.findByOrFail('id', 2);
            expect(entity).toBeDefined();
            expect(entity === null || entity === void 0 ? void 0 : entity.id).toBe(2);
            expect(entity === null || entity === void 0 ? void 0 : entity.value).toBe(data === null || data === void 0 ? void 0 : data.value);
        });
        it('should return a single entity whose value matches', async () => {
            const data = {
                id: 2,
                value: 'TEST',
            };
            repository = new in_memory_repository_1.InMemoryRepository([data]);
            const entity = await repository.findByOrFail('value', 'TEST');
            expect(entity).toBeDefined();
            expect(entity === null || entity === void 0 ? void 0 : entity.id).toBe(2);
            expect(entity === null || entity === void 0 ? void 0 : entity.value).toBe(data === null || data === void 0 ? void 0 : data.value);
        });
        it('should throw a DataNotFound error when no id matches', async () => {
            const data = {
                id: 2,
                value: 'TEST',
            };
            repository = new in_memory_repository_1.InMemoryRepository([data]);
            try {
                repository.findByOrFail('id', 5);
            }
            catch (error) {
                expect(error).toEqual(data_not_found_exception_1.DataNotFoundException);
            }
        });
    });
    // ----------------------------------------------------------------------------
    // Create New Entity
    // ----------------------------------------------------------------------------
    describe('addEntity', () => {
        it('should return a newly created entity added to the system', async () => {
            const newEntity = {
                id: 10,
                value: 'NEW TEST',
            };
            repository = new in_memory_repository_1.InMemoryRepository([]);
            const result = await repository.addEntity(newEntity);
            expect(result).toBeDefined();
            expect(result === null || result === void 0 ? void 0 : result.id).toEqual(newEntity.id);
        });
    });
    // ----------------------------------------------------------------------------
    // Update Entity
    // ----------------------------------------------------------------------------
    describe('updateEntity', () => { });
    // ----------------------------------------------------------------------------
    // Delete Entity
    // ----------------------------------------------------------------------------
    describe('deleteEntity', () => { });
    // ----------------------------------------------------------------------------
    // Drop All Entities
    // ----------------------------------------------------------------------------
    describe('dropAllEntities', () => { });
});
//# sourceMappingURL=in-memory-repository.spec.js.map