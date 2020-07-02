import faker from 'faker';
import factory from 'factory-girl';
import { Store, Product } from '../../src/app/models';

factory.define('Store', Store, {
  name: faker.name.findName(),
});

factory.define('Product', Product, {
  name: faker.name.findName(),
  sell: 22.22,
});

export { factory };
