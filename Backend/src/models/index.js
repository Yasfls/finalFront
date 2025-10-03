import { Sequelize, DataTypes } from 'sequelize';
import dbConfig from '../config/config.js';

import UserModel from './user.js';
import CategoryModel from './category.js';
// ⚠️ REMOVIDO: import ProductModel from './product.js';
// ⚠️ REMOVIDO: import OrderModel from './order.js';
// ⚠️ REMOVIDO: import OrderProductModel from './orderProduct.js';

import TransactionModel from './transaction.js'; // 💰 NOVO
import AttachmentModel from './attachment.js'; // 📁 NOVO

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

// ⚠️ REMOVIDO: db.Product, db.Order, db.OrderProduct

db.Transaction = TransactionModel(sequelize, DataTypes); // 💰 NOVO
db.Attachment = AttachmentModel(sequelize, DataTypes); // 📁 NOVO


db.User.associate(db);
db.Category.associate(db);

db.Transaction.associate(db); // 💰 NOVO
db.Attachment.associate(db); // 📁 NOVO

try {
  await sequelize.sync({ force: false }); // force: false mantém os dados
  console.log('Tabelas sincronizadas.');
} catch (err) {
  console.error('Erro ao sincronizar as tabelas:', err);
}

export default db;