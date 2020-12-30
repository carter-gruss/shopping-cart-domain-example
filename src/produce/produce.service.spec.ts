import 'reflect-metadata';
import {
  ALL_MOCK_FRUIT,
  ALL_MOCK_VEGETABLE,
  MOCK_PRODUCE,
} from './mock/produce.mock';
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

  describe('findAllVegetables', () => {
    let repository: ProduceRepository<ProduceEntity>;
    let service: ProduceService;

    beforeEach(() => {
      repository = new ProduceInMemoryRepository([]);
      service = new ProduceServiceImpl(repository);
    });

    it('should return an empty array when there is no produce', async () => {
      const vegetables = await service.findAllVegetables();
      expect(vegetables).toBeInstanceOf(Array);
    });

    it('should return an array of vegetable when all produce is vegetables', async () => {
      repository = new ProduceInMemoryRepository(ALL_MOCK_VEGETABLE);
      service = new ProduceServiceImpl(repository);
      const expectedVegetableCount = ALL_MOCK_VEGETABLE.length;

      const vegetables = await service.findAllVegetables();
      expect(vegetables).toBeInstanceOf(Array);
      expect(vegetables.length).toBe(expectedVegetableCount);
    });

    it('should return an empty array when all produce is fruit', async () => {
      repository = new ProduceInMemoryRepository(ALL_MOCK_VEGETABLE);
      service = new ProduceServiceImpl(repository);

      const vegetables = await service.findAllFruit();
      expect(vegetables).toBeInstanceOf(Array);
      expect(vegetables.length).toBe(0);
    });
  });

  describe('findFruitByName', () => {
    let repository: ProduceRepository<ProduceEntity>;
    let service: ProduceService;

    beforeEach(() => {
      repository = new ProduceInMemoryRepository([]);
      service = new ProduceServiceImpl(repository);
    });

    it('should return null when there is no produce', async () => {
      const produce = await service.findFruitByName('fruit');
      expect(produce).toBeNull();
    });

    it('should return a produce whose name matches', async () => {
      const mockProduce = MOCK_PRODUCE[2];
      repository = new ProduceInMemoryRepository(MOCK_PRODUCE);
      service = new ProduceServiceImpl(repository);
      const mockProduceName = mockProduce.name;

      const foundProduce = await service.findFruitByName(mockProduceName);
      expect(foundProduce).toBeDefined();
      expect(foundProduce?.name).toBe(mockProduceName);
    });
  });
});
