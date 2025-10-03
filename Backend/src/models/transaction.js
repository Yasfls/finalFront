export default (sequelize, DataTypes) => {
  const Transaction = sequelize.define('transaction', {
    id_transaction: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    type: { // RECEITA ou DESPESA
      type: DataTypes.ENUM('RECEITA', 'DESPESA'),
      allowNull: false
    },
    amount: { // Valor da transação
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    attachment_id: { // Link para o anexo do cupom fiscal
        type: DataTypes.INTEGER,
        allowNull: true
    }
  });

  Transaction.associate = (models) => {
    Transaction.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    });
    Transaction.belongsTo(models.Category, {
      foreignKey: 'category_id',
      as: 'category'
    });
    Transaction.belongsTo(models.Attachment, {
        foreignKey: 'attachment_id',
        as: 'attachment'
    });
  };

  return Transaction;
};