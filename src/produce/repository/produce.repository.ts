import {injectable} from 'tsyringe';
import {
  InMemoryRepository,
  InMemoryStore,
} from '../../core/providers/repository/in-memory-repository';
import {ProduceType} from '../interfaces';
import {MOCK_PRODUCE} from '../mock/produce.mock';
import {ProduceEntity} from '../produce.entity';
import {ProduceRepository} from './produce-dao.interface';

@injectable()
export class ProduceInMemoryRepository
  implements
    InMemoryRepository<ProduceEntity>,
    ProduceRepository<ProduceEntity> {
  inMemoryStore: InMemoryStore<ProduceEntity>;

  constructor(entities: ProduceEntity[] = MOCK_PRODUCE) {
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
