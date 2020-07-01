import { Model, DataTypes } from 'sequelize';

export class Store extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        deleted_at: DataTypes.DATE,
      },
      {
        sequelize,
        tableName: 'stores',
      }
    );
  }

  static associate(models) {
    this.belongsToMany(models.Product, {
      foreignKey: 'store_id',
      through: 'store_products',
      as: 'products',
    });
  }
}
