import {injectable} from 'tsyringe';
import {Produce} from './interfaces';

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
  findFruitByName(): Promise<Produce>;
}

@injectable()
export class ProduceServiceImpl implements ProduceService {
  constructor() {}

  findAllFruit(): Promise<Produce[]> {
    throw new Error('Method not implemented.');
  }

  findAllVegetables(): Promise<Produce[]> {
    throw new Error('Method not implemented.');
  }

  findFruitByName(): Promise<Produce> {
    throw new Error('Method not implemented.');
  }
}
