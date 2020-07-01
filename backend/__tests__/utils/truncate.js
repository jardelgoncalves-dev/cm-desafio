import { StoreProduct, Product, Store } from '../../src/app/models';

export const truncate = async () => {
  return Promise.all(
    [StoreProduct, Product, Store].map((m) =>
      m.destroy({ truncate: { cascade: true }, logging: false, force: true })
    )
  );
};
