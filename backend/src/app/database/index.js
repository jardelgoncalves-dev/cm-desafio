import Sequelize from 'sequelize';

import { Store, Product, StoreProduct } from '../models';

const dbConfig = require('../../config/database');

const connection = new Sequelize(dbConfig);

Store.init(connection);
Product.init(connection);
StoreProduct.init(connection);

Store.associate(connection.models);
Product.associate(connection.models);
StoreProduct.associate(connection.models);

export default connection;
