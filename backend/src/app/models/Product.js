const { Model, DataTypes } = require('sequelize');

export class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: 'products',
      }
    );
  }

  static associate(models) {
    this.belongsToMany(models.Store, {
      foreignKey: 'product_id',
      through: 'store_products',
      as: 'stores',
    });
  }
}
