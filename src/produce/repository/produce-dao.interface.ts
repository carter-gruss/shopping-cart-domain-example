import {ProduceType} from '../interfaces';

export interface ProduceDAO<ProduceEntity extends {}> {
  /**
   * Returns all ProduceEntities in the store.
   */
  findAllProduce(): Promise<ProduceEntity[]>;

  /**
   * Returns all produce matching the specified type.
   * @param produceType The type of produce to find.
   */
  findAllByProduceType(produceType: ProduceType): Promise<ProduceEntity[]>;

  /**
   * Returns a produce whose name matches the given string
   * @param name The name of the produce
   */
  findByName(name: string): Promise<ProduceEntity | null>;
}
