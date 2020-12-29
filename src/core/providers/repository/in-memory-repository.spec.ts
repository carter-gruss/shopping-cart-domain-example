import {DataNotFoundException} from '../../../common/exceptions/data-not-found.exception';
import {InMemoryRepository} from './in-memory-repository';

interface Datum {
  id: number;
  value: string;
}

const EMPTY_MOCK_DATA: Datum[] = [];
const MOCK_DATA_WITH_ONE_ENTITY: Datum[] = [{id: 0, value: 'MOCK DATA'}];
const MOCK_DATA_ARRAY: Datum[] = [
  {id: 0, value: 'MOCK DATA'},
  {id: 1, value: 'MOCK DATA 1'},
  {id: 2, value: 'MOCK DATA 2'},
  {id: 3, value: 'MOCK DATA 3'},
];

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
      expect(entities[0]).toEqual(testData[0]);
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
      expect(entities[0]).toEqual(testData[0]);
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

    it('should throw a DataNotFoundException error when no id matches', async () => {
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
      const COPY_OF_MOCK_DATA = [...EMPTY_MOCK_DATA];

      const newEntity: Datum = {
        id: 10,
        value: 'NEW TEST',
      };

      repository = new InMemoryRepository(COPY_OF_MOCK_DATA);

      const result = await repository.addEntity(newEntity);
      expect(result).toBeDefined();
      expect(result?.id).toEqual(newEntity.id);
      expect(result?.value).toEqual(newEntity.value);
    });

    it('should be able to add a new entity to an existing array of entities', async () => {
      const COPY_OF_MOCK_DATA = [...MOCK_DATA_ARRAY];

      const newEntity: Datum = {
        id: 10,
        value: 'NEW TEST',
      };

      repository = new InMemoryRepository(COPY_OF_MOCK_DATA);

      const result = await repository.addEntity(newEntity);
      expect(result).toBeDefined();
      expect(result?.id).toEqual(newEntity.id);
      expect(result?.value).toEqual(newEntity.value);
    });
  });

  // ----------------------------------------------------------------------------
  // Update Entity
  // ----------------------------------------------------------------------------
  describe('updateEntity', () => {
    it('should be able to update an existing entity from an array of entities', async () => {
      const COPY_OF_MOCK_DATA = [...MOCK_DATA_ARRAY];

      const entityToUpdate = COPY_OF_MOCK_DATA[0];
      const UPDATED_VALUE = 'UPDATED!!!';
      const updatedEntity = Object.assign({}, entityToUpdate, {
        value: UPDATED_VALUE,
      });
      repository = new InMemoryRepository(COPY_OF_MOCK_DATA);

      const result = await repository.updateEntity(
        entityToUpdate?.id,
        updatedEntity
      );
      expect(result).toBeDefined();
      expect(result?.id).toBe(updatedEntity.id);
      expect(result?.value).toBe(UPDATED_VALUE);
    });

    it('should be able to insert a new entity to an array of entities', async () => {
      const lastEntity = MOCK_DATA_ARRAY[MOCK_DATA_ARRAY.length - 1];
      const newEntityId = lastEntity.id + 1;
      const NEWLY_ADDED_VALUE = 'JUST ADDED';
      const newEntity = {
        id: newEntityId,
        value: NEWLY_ADDED_VALUE,
      };

      repository = new InMemoryRepository(MOCK_DATA_ARRAY);

      const result = await repository.updateEntity(newEntityId, newEntity);
      expect(result).toBeDefined();
      expect(result?.value).toBe(NEWLY_ADDED_VALUE);
    });
  });

  // ----------------------------------------------------------------------------
  // Delete Entity
  // ----------------------------------------------------------------------------
  describe('deleteEntity', () => {
    it('should throw an DataNotFoundException if no entity can be deleted', async () => {
      repository = new InMemoryRepository(EMPTY_MOCK_DATA);

      try {
        repository.deleteEntity(3);
      } catch (error) {
        expect(error).toBeDefined();
        expect(error).toEqual(DataNotFoundException);
      }
    });

    it('should return a DeleteDataResult when one entity is deleted', async () => {
      const COPY_OF_MOCK_DATA = [...MOCK_DATA_ARRAY];
      repository = new InMemoryRepository(COPY_OF_MOCK_DATA);

      const result = await repository.deleteEntity(2);
      expect(result).toBeDefined();
      expect(result.affected).toBe(1);
      expect(result.status).toBe('success');
    });

    it('should reduce the length of the dataset when one entity is deleted', async () => {
      const COPY_OF_MOCK_DATA = [...MOCK_DATA_ARRAY];
      const initialLengthOfData = COPY_OF_MOCK_DATA.length;
      repository = new InMemoryRepository(COPY_OF_MOCK_DATA);
      const result = await repository.deleteEntity(2);

      const internalArr = repository['_inMemoryRepository'].length;

      expect(result.status).toBe('success');
      expect(internalArr).toBeLessThan(initialLengthOfData);
    });
  });

  // ----------------------------------------------------------------------------
  // Drop All Entities
  // ----------------------------------------------------------------------------
  describe('dropAllEntities', () => {
    it('should drop regardless of whether the dataset is empty', async () => {
      repository = new InMemoryRepository(EMPTY_MOCK_DATA);
      const result = await repository.dropAllEntities();
      expect(result.affected).toBe(0);
      expect(result.status).toBe('success');
    });

    it('should drop all entities from the existing dataset', async () => {
      const COPY_OF_MOCK_DATA = [...MOCK_DATA_ARRAY];

      repository = new InMemoryRepository(COPY_OF_MOCK_DATA);
      const result = await repository.dropAllEntities();
      const internalArr = repository['_inMemoryRepository'].length;

      expect(result.affected).toBe(COPY_OF_MOCK_DATA.length);
      expect(result.status).toBe('success');
      expect(internalArr).toBe(0);
    });
  });
});
