import { Product, StoreProduct, Store } from '../models';
import { successResponse, errorResponse } from '../../utils';

export class ProductServices {
  static async index() {
    try {
      const data = await Product.findAll({
        where: { deleted_at: null },
        include: [
          {
            model: Store,
            as: 'stores',
          },
        ],
      });
      return successResponse(data, 200);
    } catch (err) {
      return errorResponse();
    }
  }

  static async find({ id }) {
    try {
      const product = await Product.findOne({
        where: { id, deleted_at: null },
        include: [
          {
            model: Store,
            as: 'stores',
          },
        ],
      });

      if (!product)
        return errorResponse(
          { error: { default: 'Produto não encontrada!' } },
          404
        );

      return successResponse(product, 200);
    } catch (err) {
      return errorResponse();
    }
  }

  static async store({ name, stores = [] }) {
    try {
      const product = await Product.create({ name });

      await Promise.all(
        stores.map((store_id) =>
          StoreProduct.findOrCreate({
            where: { store_id, product_id: product.id },
            defaults: { store_id, product_id: product.id },
          })
        )
      );

      const productWithStore = await this.find({ id: product.id });

      return successResponse(productWithStore.data, 201);
    } catch (err) {
      return errorResponse();
    }
  }

  static async edit({ id, name, stores = [] }) {
    try {
      const product = await Product.findOne({
        where: { id, deleted_at: null },
        include: [{ model: Store, as: 'stores' }],
      });

      if (!product)
        return errorResponse(
          { error: { default: 'Loja não encontrada!' } },
          404
        );

      const storesIds = product.stores.map((st) => st.id);

      const deletedStores = storesIds.filter((stId) => !stores.includes(stId));
      const newStores = stores.filter((nwsId) => !storesIds.includes(nwsId));

      await Promise.all(
        newStores.map((store_id) =>
          StoreProduct.findOrCreate({
            where: { store_id, product_id: product.id },
            defaults: { store_id, product_id: product.id },
          })
        )
      );
      await Promise.all(
        deletedStores.map((store_id) =>
          StoreProduct.destroy({
            where: { store_id, product_id: product.id },
          })
        )
      );

      await Product.update({ name }, { where: { id } });

      const productUpdated = this.find({ id });

      return successResponse(productUpdated, 200);
    } catch (err) {
      return errorResponse();
    }
  }

  static async softDelete({ id }) {
    try {
      const product = await Product.findOne({
        where: { id, deleted_at: null },
      });

      if (!product)
        return errorResponse(
          { error: { default: 'Loja não encontrada!' } },
          404
        );

      await Product.update({ deleted_at: new Date() }, { where: { id } });

      return successResponse({}, 204);
    } catch (err) {
      return errorResponse();
    }
  }
}
