import { Sequelize, DataTypes } from 'sequelize';
import dbConfig from '../config/config.js';

import UserModel from './user.js';
import CategoryModel from './category.js';
import ProductModel from './product.js';
import OrderModel from './order.js';
import OrderProductModel from './orderProduct.js';

const sequelize = new Sequelize(
  dbConfig.development.database,
  dbConfig.development.username,
  dbConfig.development.password,
  {
    host: dbConfig.development.host,
    dialect: dbConfig.development.dialect,
    operatorsAliases: false,
  }
);

// Testando a conexão com o banco
try {
  await sequelize.authenticate();
  console.log('Conectado com o Banco de Dados.');
} catch (err) {
  console.error('Não foi possível conectar ao banco de dados:', err);
}

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = UserModel(sequelize, DataTypes);
db.Category = CategoryModel(sequelize, DataTypes);
db.Product = ProductModel(sequelize, DataTypes);
db.Order = OrderModel(sequelize, DataTypes);
db.OrderProduct = OrderProductModel(sequelize, DataTypes);

// Relacionamentos das tabelas
db.User.associate(db);
db.Category.associate(db);
db.Product.associate(db);
db.Order.associate(db);
db.OrderProduct.associate(db);

try {
  await sequelize.sync({ force: true });
  console.log('Tabelas sincronizadas.');
} catch (err) {
  console.error('Erro ao sincronizar as tabelas:', err);
}

export default db;