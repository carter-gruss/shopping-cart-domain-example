import {DataNotFoundException} from '../../../common/exceptions/data-not-found.exception';
import {InMemoryRepository} from './in-memory-repository';

interface Datum {
  id: number;
  value: string;
}

const EMPTY_MOCK_DATA: Datum[] = [];
const MOCK_DATA_WITH_ONE_ENTITY: Datum[] = [{id: 0, value: 'MOCK DATA'}];
const MOCK_DATA_ARRAY: Datum[] = [{id: 0, value: 'MOCK DATA'}, {id: 1, value: 'MOCK DATA 1'}, {id: 2, value: 'MOCK DATA 2'}, {id: 3, value: 'MOCK DATA 3'}];

describe('InMemoryRepository', () => {
  // ----------------------------------------------------------------------------
  // Setup
  // ----------------------------------------------------------------------------
  let repository: InMemoryRepository<Datum>;

  beforeEach(async () => {
    repository = new InMemoryRepository(EMPTY_MOCK_DATA);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  // ----------------------------------------------------------------------------
  // Find All Entities
  // ----------------------------------------------------------------------------
  describe('findAll', () => {
    it('should return an array when no entity is available', async () => {
      const testData: Datum[] = EMPTY_MOCK_DATA;
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
      const valueToFindBy = 'TEST 2';
      const expected: Datum = {
        id: 2,
        value: valueToFindBy,
      };

      repository = new InMemoryRepository([
        {id: 1, value: 'TEST 1'},
        expected,
        {id: 3, value: 'TEST 3'},
      ]);

      const entity = await repository.findBy('value', valueToFindBy);

      expect(entity).toBeDefined();
      expect(entity?.id).toBe(2);
      expect(entity?.value).toBe(expected?.value);
    });
  });

  // ----------------------------------------------------------------------------
  // Get Entity By Id Or Fail
  // ----------------------------------------------------------------------------
  describe('findBy', () => {
    it('should be able to find an entity by its numeric id', async () => {
      const idToFindBy = 10;
      const data: Datum = {
        id: idToFindBy,
        value: 'TEST',
      };

      repository = new InMemoryRepository([...MOCK_DATA_ARRAY, data]);

      const entity = await repository.findByOrFail('id', idToFindBy);
      expect(entity).toBeDefined();
      expect(entity?.id).toBe(idToFindBy);
      expect(entity?.value).toBe(data?.value);
    });

    it('should return a single entity whose value matches', async () => {
      const valueToFindBy = 'TEST 2';

      const data: Datum = {
        id: 2,
        value: valueToFindBy,
      };

      repository = new InMemoryRepository([data]);

      const entity = await repository.findByOrFail('value', valueToFindBy);

      expect(entity).toBeDefined();
      expect(entity?.id).toBe(2);
      expect(entity?.value).toBe(data?.value);
    });

    it('should throw a DataNotFound error when no id matches', async () => {
      repository = new InMemoryRepository(EMPTY_MOCK_DATA);

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

      repository = new InMemoryRepository(EMPTY_MOCK_DATA);

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
