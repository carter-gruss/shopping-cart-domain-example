import {ProduceType} from '../interfaces';
import {ProduceEntity} from '../produce.entity';

export interface ProduceRepository<E extends ProduceEntity> {
  /**
   * Returns all ProduceEntities in the store.
   */
  findAllProduce(): Promise<E[]>;

  /**
   * Returns all produce matching the specified type.
   * @param produceType The type of produce to find.
   */
  findAllByProduceType(produceType: ProduceType): Promise<E[]>;

  /**
   * Returns a produce whose name matches the given string
   * @param name The name of the produce
   */
  findByName(name: string): Promise<E | null>;
}
