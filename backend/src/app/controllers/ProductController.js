import { ProductServices } from '../services';
import { validator } from '../../utils';

export class ProductController {
  static async index(req, res) {
    const response = await ProductServices.index();
    return res.status(response.status).json(response.data);
  }

  static async find(req, res) {
    const { id } = req.params;

    const validations = validator({
      'id:required': id,
    });

    if (validations.hasError()) {
      return res.status(400).json(validations.error);
    }

    const response = await ProductServices.find({ id });
    return res.status(response.status).json(response.data);
  }

  static async store(req, res) {
    const { name, sell, stores } = req.body;

    const validations = validator({
      'name:required': name,
      'sell:required': sell,
    });

    if (validations.hasError()) {
      return res.status(400).json(validations.error);
    }

    const response = await ProductServices.store({ name, sell, stores });
    return res.status(response.status).json(response.data);
  }

  static async edit(req, res) {
    const { name, sell, stores } = req.body;
    const { id } = req.params;

    const validations = validator({
      'name:required': name,
      'sell:required': sell,
      'id:required': id,
    });

    if (validations.hasError()) {
      return res.status(400).json(validations.error);
    }

    const response = await ProductServices.edit({ id, name, sell, stores });
    return res.status(response.status).json(response.data);
  }

  static async delete(req, res) {
    const { id } = req.params;

    const validations = validator({
      'id:required': id,
    });

    if (validations.hasError()) {
      return res.status(400).json(validations.error);
    }

    const response = await ProductServices.softDelete({ id: Number(id) });
    return res.status(response.status).json(response.data);
  }
}
