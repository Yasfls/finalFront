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
    type: {
      type: DataTypes.ENUM('RECEITA', 'DESPESA'),
      allowNull: false
    },
    amount: {
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
    is_paid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: 'Indica se a transação (despesa ou receita) já foi efetivada.'
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }

  }, {

    timestamps: true,
    underscored: true 
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
    Transaction.hasMany(models.Attachment, {
        foreignKey: 'transaction_id',
        as: 'attachments'
    });
  };

  return Transaction;
};
