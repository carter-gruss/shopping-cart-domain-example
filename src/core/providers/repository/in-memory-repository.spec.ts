import {DataNotFoundException} from '../../../common/exceptions/data-not-found.exception';
import {InMemoryRepository} from './in-memory-repository';

interface Datum {
  id: number;
  value: string;
}

describe('InMemoryRepository', () => {
  let repository: InMemoryRepository<Datum>;

  beforeEach(async () => {
    repository = new InMemoryRepository([]);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  // ----------------------------------------------------------------------------
  // Find All Entities
  // ----------------------------------------------------------------------------
  describe('findAll', () => {
    it('should return an array when no entity is available', async () => {
      const testData: Datum[] = [];
      repository = new InMemoryRepository(testData);

      const entities = await repository.findAll();
      expect(entities).toBeInstanceOf(Array);
      expect(entities).toBe(testData);
    });

    it('should return an array when one entity is available', async () => {
      const testData: Datum[] = [
        {
          id: 2,
          value: 'test',
        },
      ];

      repository = new InMemoryRepository(testData);

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
      const data: Datum = {
        id: 2,
        value: 'TEST',
      };

      repository = new InMemoryRepository([data]);

      const entity = await repository.findBy('id', 2);
      expect(entity).toBeDefined();
      expect(entity?.id).toBe(2);
      expect(entity?.value).toBe(data?.value);
    });

    it('should return a single entity whose value matches', async () => {
      const data: Datum = {
        id: 2,
        value: 'TEST',
      };

      repository = new InMemoryRepository([data]);

      const entity = await repository.findBy('value', 'TEST');

      expect(entity).toBeDefined();
      expect(entity?.id).toBe(2);
      expect(entity?.value).toBe(data?.value);
    });
  });

  // ----------------------------------------------------------------------------
  // Get Entity By Id Or Fail
  // ----------------------------------------------------------------------------
  describe('findBy', () => {
    it('should be able to find an entity by its numeric id', async () => {
      const data: Datum = {
        id: 2,
        value: 'TEST',
      };

      repository = new InMemoryRepository([data]);

      const entity = await repository.findByOrFail('id', 2);
      expect(entity).toBeDefined();
      expect(entity?.id).toBe(2);
      expect(entity?.value).toBe(data?.value);
    });

    it('should return a single entity whose value matches', async () => {
      const data: Datum = {
        id: 2,
        value: 'TEST',
      };

      repository = new InMemoryRepository([data]);

      const entity = await repository.findByOrFail('value', 'TEST');

      expect(entity).toBeDefined();
      expect(entity?.id).toBe(2);
      expect(entity?.value).toBe(data?.value);
    });

    it('should throw a DataNotFound error when no id matches', async () => {
      const data: Datum = {
        id: 2,
        value: 'TEST',
      };
      repository = new InMemoryRepository([data]);

      try {
        repository.findByOrFail('id', 5);
      } catch (error) {
        expect(error).toEqual(DataNotFoundException);
      }
    });
  });

  // ----------------------------------------------------------------------------
  // Create New Entity
  // ----------------------------------------------------------------------------
  describe('addEntity', () => {
    it('should return a newly created entity added to the system', async () => {
      const newEntity: Datum = {
        id: 10,
        value: 'NEW TEST',
      };

      repository = new InMemoryRepository([]);

      const result = await repository.addEntity(newEntity);
      expect(result).toBeDefined();
      expect(result?.id).toEqual(newEntity.id);
    });
  });

  // ----------------------------------------------------------------------------
  // Update Entity
  // ----------------------------------------------------------------------------
  describe('updateEntity', () => {});

  // ----------------------------------------------------------------------------
  // Delete Entity
  // ----------------------------------------------------------------------------
  describe('deleteEntity', () => {});

  // ----------------------------------------------------------------------------
  // Drop All Entities
  // ----------------------------------------------------------------------------
  describe('dropAllEntities', () => {});
});
