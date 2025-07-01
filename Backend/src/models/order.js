export default (sequelize, DataTypes) => {
  const Order = sequelize.define('order', {
    id_order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: { // NOVO CAMPO: Status do pedido
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Em Preparo' // Valor padrão ao criar um novo pedido
    }
  });

    Order.associate = (models) => {
    Order.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    });

    Order.belongsToMany(models.Product, {
      through: models.OrderProduct,
      foreignKey: 'order_id',
      as: 'products'
    });
  };

  return Order;
};