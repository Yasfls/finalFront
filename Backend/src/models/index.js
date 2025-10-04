import { Sequelize, DataTypes } from 'sequelize';
import dbConfig from '../config/config.js';

// Modelos Base (Mantidos)
import UserModel from './user.js';
import CategoryModel from './category.js';

// ⚠️ REMOVIDOS: ProductModel, OrderModel, OrderProductModel

// 💰 NOVOS MODELOS para Finanças Pessoais
import TransactionModel from './transaction.js';
import AttachmentModel from './attachment.js'; 

// Inicialização do Sequelize (Conexão)
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

// Carregamento dos Modelos
db.User = UserModel(sequelize, DataTypes);
db.Category = CategoryModel(sequelize, DataTypes);

// ⚠️ REMOVIDO: db.Product, db.Order, db.OrderProduct

db.Transaction = TransactionModel(sequelize, DataTypes); // 💰 Carregado o modelo de Transações
db.Attachment = AttachmentModel(sequelize, DataTypes); // 📁 Carregado o modelo de Anexos


// Configuração das Associações (Relacionamentos)
db.User.associate(db);
db.Category.associate(db);

db.Transaction.associate(db); // 💰 Configuração dos relacionamentos de Transação
db.Attachment.associate(db); // 📁 Configuração dos relacionamentos de Anexo

// Sincronização com o Banco de Dados (Criação das Tabelas)
try {
  await sequelize.sync({ force: false }); // force: false garante que as tabelas existentes não serão apagadas
  console.log('Tabelas sincronizadas.');
} catch (err) {
  console.error('Erro ao sincronizar as tabelas:', err);
}

export default db;