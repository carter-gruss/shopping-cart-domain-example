import {inject, injectable} from 'tsyringe';
import {Produce} from './interfaces';
import {ProduceEntity} from './produce.entity';
import {ProduceRepository} from './repository/produce-dao.interface';

export interface ProduceService {
  /**
   * Return all produce with a ProduceType matching `Fruit`.
   */
  findAllFruit(): Promise<Produce[]>;

  /**
   * Return all produce with a ProduceType matching `Vegetable`.
   */
  findAllVegetables(): Promise<Produce[]>;

  /**
   * Return a fruit found by its name.
   */
  findFruitByName(fruitName: string): Promise<Produce | null>;
}

@injectable()
export class ProduceServiceImpl implements ProduceService {
  constructor(
    @inject('ProduceRepository')
    private _produceRepo: ProduceRepository<ProduceEntity>
  ) {}

  findAllFruit(): Promise<Produce[]> {
    const allFruit = this._produceRepo.findAllByProduceType('Fruit');
    return allFruit;
  }

  findAllVegetables(): Promise<Produce[]> {
    const allVegetables = this._produceRepo.findAllByProduceType('Vegetable');
    return allVegetables;
  }

  findFruitByName(name: string): Promise<Produce | null> {
    const fruit = this._produceRepo.findByName(name);
    return fruit;
  }
}
