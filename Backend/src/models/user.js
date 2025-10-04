export default (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  User.associate = (models) => {
    // 💰 Alterado: Usuário tem muitas Transações (em vez de Pedidos)
    User.hasMany(models.Transaction, {
      foreignKey: 'user_id',
      as: 'transactions' // Novo alias
    });
  };

  return User;
};