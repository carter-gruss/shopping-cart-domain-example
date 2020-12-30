import {container} from 'tsyringe';
import {ProduceServiceImpl} from '../produce/produce.service';

const createAppContainer = async () => {
  container.register('ProduceService', {
    useClass: ProduceServiceImpl,
  });
};

export default createAppContainer;
