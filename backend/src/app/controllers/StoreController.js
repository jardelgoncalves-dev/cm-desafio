import { StoreServices } from '../services';
import { validator } from '../../utils';

export class StoreController {
  static async index(req, res) {
    const response = await StoreServices.index();
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

    const response = await StoreServices.find({ id });
    return res.status(response.status).json(response.data);
  }

  static async store(req, res) {
    const { name } = req.body;

    const validations = validator({
      'name:required': name,
    });

    if (validations.hasError()) {
      return res.status(400).json(validations.error);
    }

    const response = await StoreServices.store({ name });
    return res.status(response.status).json(response.data);
  }

  static async edit(req, res) {
    const { name } = req.body;
    const { id } = req.params;

    const validations = validator({
      'name:required': name,
      'id:required': id,
    });

    if (validations.hasError()) {
      return res.status(400).json(validations.error);
    }

    const response = await StoreServices.edit({ id, name });
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

    const response = await StoreServices.softDelete({ id });
    return res.status(response.status).json(response.data);
  }
}
