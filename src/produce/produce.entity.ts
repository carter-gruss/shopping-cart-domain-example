import {Produce, ProduceType} from './interfaces';

export class ProduceEntity implements Produce {
  id!: number;
  name!: string;
  weightInPounds!: number;
  produceType!: ProduceType;
}
