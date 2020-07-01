import { Model, DataTypes } from 'sequelize';

export class StoreProduct extends Model {
  static init(sequelize) {
    super.init(
      {
        store_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        product_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'store_products',
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Product, {
      foreignKey: 'product_id',
      targetKey: 'id',
      as: 'products',
    });
    this.belongsTo(models.Store, {
      foreignKey: 'store_id',
      targetKey: 'id',
      as: 'stores',
    });
  }
}
