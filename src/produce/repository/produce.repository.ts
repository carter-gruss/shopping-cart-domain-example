import {
  InMemoryRepository,
  InMemoryStore,
} from '../../core/providers/repository/in-memory-repository';
import {ProduceType} from '../interfaces';
import {ProduceEntity} from '../produce.entity';
import {ProduceDAO} from './produce-dao.interface';

export class ProduceInMemoryRepository
  implements InMemoryRepository<ProduceEntity>, ProduceDAO<ProduceEntity> {
  inMemoryStore: InMemoryStore<ProduceEntity>;

  constructor(entities: ProduceEntity[]) {
    this.inMemoryStore = new InMemoryStore<ProduceEntity>(entities);
  }

  findAllProduce(): Promise<ProduceEntity[]> {
    const allProduce = this.inMemoryStore.findAllEntities();
    return allProduce;
  }

  findAllByProduceType(produceType: ProduceType): Promise<ProduceEntity[]> {
    const allProductOfType = this.inMemoryStore.findEntitiesBy(
      'produceType',
      produceType
    );
    return allProductOfType;
  }

  findByName(name: string): Promise<ProduceEntity | null> {
    const produceWithName = this.inMemoryStore.findEntityBy('name', name);
    return produceWithName;
  }
}
