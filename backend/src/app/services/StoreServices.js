import { Store, Product } from '../models';
import { successResponse, errorResponse } from '../../utils';

export class StoreServices {
  static async index() {
    try {
      const data = await Store.findAll({ where: { deleted_at: null } });
      return successResponse(data, 200);
    } catch (err) {
      return errorResponse();
    }
  }

  static async find({ id }) {
    try {
      const store = await Store.findOne({
        where: { id, deleted_at: null },
        include: [{ model: Product, as: 'products' }],
      });

      if (!store)
        return errorResponse(
          { error: { default: 'Loja não encontrada!' } },
          404
        );

      return successResponse(store, 200);
    } catch (err) {
      return errorResponse();
    }
  }

  static async store({ name }) {
    try {
      const data = await Store.create({ name });
      return successResponse(data, 201);
    } catch (err) {
      return errorResponse();
    }
  }

  static async edit({ id, name }) {
    try {
      const store = await Store.findOne({
        where: { id, deleted_at: null },
      });

      if (!store)
        return errorResponse(
          { error: { default: 'Loja não encontrada!' } },
          404
        );

      await Store.update({ name }, { where: { id } });

      return this.find({ id });
    } catch (err) {
      return errorResponse();
    }
  }

  static async softDelete({ id }) {
    try {
      const store = await Store.findOne({
        where: { id, deleted_at: null },
      });

      if (!store)
        return errorResponse(
          { error: { default: 'Loja não encontrada!' } },
          404
        );

      await Store.update({ deleted_at: new Date() }, { where: { id } });

      return successResponse({}, 204);
    } catch (err) {
      return errorResponse();
    }
  }
}
