import {ProduceEntity} from '../produce.entity';

export const MOCK_PRODUCE: ProduceEntity[] = [
  {
    id: 1,
    name: 'Fuji Apples',
    weightInPounds: 1.2,
    produceType: 'Vegetable',
  },
  {
    id: 2,
    name: 'Banana',
    weightInPounds: 1,
    produceType: 'Fruit',
  },
  {
    id: 3,
    name: 'Baby Carrots',
    weightInPounds: 1.2,
    produceType: 'Vegetable',
  },
  {
    id: 4,
    name: 'Blueberries',
    weightInPounds: 1,
    produceType: 'Fruit',
  },

  {
    id: 5,
    name: 'Strawberries',
    weightInPounds: 1,
    produceType: 'Fruit',
  },
  {
    id: 6,
    name: 'Broccoli',
    weightInPounds: 2.3,
    produceType: 'Vegetable',
  },
  {
    id: 7,
    name: 'Cauliflower',
    weightInPounds: 2.5,
    produceType: 'Vegetable',
  },
];

export const ALL_MOCK_FRUIT = MOCK_PRODUCE.filter(
  produce => produce.produceType === 'Fruit'
);

export const ALL_MOCK_VEGETABLE = MOCK_PRODUCE.filter(
  produce => produce.produceType === 'Vegetable'
);
