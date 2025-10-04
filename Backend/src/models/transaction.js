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
      type: DataTypes.DATEONLY, // Data em que a transação ocorreu/deve ocorrer
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    is_paid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false, // Por padrão, a transação é considerada pendente/não paga
      comment: 'Indica se a transação (despesa ou receita) já foi efetivada.'
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
    // O campo attachment_id foi removido, pois a FK agora fica na tabela Attachment
  }, {
    // Adicionando timestamps (created_at, updated_at) e snake_case (underscore)
    timestamps: true,
    underscored: true 
  });

  Transaction.associate = (models) => {
    // Relacionamento 1:N com User
    Transaction.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    });
    // Relacionamento 1:N com Category
    Transaction.belongsTo(models.Category, {
      foreignKey: 'category_id',
      as: 'category'
    });
    // Relacionamento 1:N com Attachment (Uma Transação tem Muitos Anexos)
    Transaction.hasMany(models.Attachment, {
        foreignKey: 'transaction_id', // Esta FK deve estar na tabela Attachment
        as: 'attachments'
    });
  };

  return Transaction;
};
