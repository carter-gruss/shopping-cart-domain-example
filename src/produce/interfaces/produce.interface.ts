export type ProduceType = 'Fruit' | 'Vegetable';

export interface Produce {
  name: string;
  weightInPounds: number;
  produceType: ProduceType;
}
