import 'reflect-metadata';
import {ALL_MOCK_FRUIT, ALL_MOCK_VEGETABLE} from './mock/produce.mock';
import {ProduceEntity} from './produce.entity';
import {ProduceService, ProduceServiceImpl} from './produce.service';
import {ProduceRepository} from './repository/produce-dao.interface';
import {ProduceInMemoryRepository} from './repository/produce.repository';

describe('ProduceService', () => {
  describe('Happy Path', () => {
    it('should be able to be instantiated', () => {
      const repository = new ProduceInMemoryRepository([]);
      const service = new ProduceServiceImpl(repository);
      expect(repository).toBeDefined();
      expect(service).toBeDefined();
    });
  });

  describe('findAllFruit', () => {
    let repository: ProduceRepository<ProduceEntity>;
    let service: ProduceService;

    beforeEach(() => {
      repository = new ProduceInMemoryRepository([]);
      service = new ProduceServiceImpl(repository);
    });

    it('should return an empty array when there is no produce', async () => {
      const fruit = await service.findAllFruit();
      expect(fruit).toBeInstanceOf(Array);
    });

    it('should return an array of fruit when all produce is fruit', async () => {
      repository = new ProduceInMemoryRepository(ALL_MOCK_FRUIT);
      service = new ProduceServiceImpl(repository);
      const expectedFruitCount = ALL_MOCK_FRUIT.length;

      const fruit = await service.findAllFruit();
      expect(fruit).toBeInstanceOf(Array);
      expect(fruit.length).toBe(expectedFruitCount);
    });

    it('should return an empty array when all produce is vegetables', async () => {
      repository = new ProduceInMemoryRepository(ALL_MOCK_VEGETABLE);
      service = new ProduceServiceImpl(repository);

      const fruit = await service.findAllFruit();
      expect(fruit).toBeInstanceOf(Array);
      expect(fruit.length).toBe(0);
    });
  });

  describe('findAllVegetables', () => {});

  describe('findFruitByName', () => {});
});
