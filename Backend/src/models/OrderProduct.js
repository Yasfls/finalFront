export default (sequelize, DataTypes) => {
  const OrderProduct = sequelize.define('order_product', {
    id_order_product: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    order_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'orders',
        key: 'id_order'
      }
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // primaryKey: true, // Remover se id_order_product já é PK e product_id faz parte de uma PK composta
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        notEmpty: true,
      },
    },
    observacao: { // NOVO CAMPO: Observação específica do produto neste pedido
      type: DataTypes.STRING(255), // Ou DataTypes.TEXT para textos mais longos
      allowNull: true, // Permitir que seja nulo
    },
  });

  OrderProduct.associate = (models) => {
    OrderProduct.belongsTo(models.Order, {
      foreignKey: 'order_id',
      as: 'order'
    });

    OrderProduct.belongsTo(models.Product, {
      foreignKey: 'product_id',
      as: 'product'
    });
  };

  return OrderProduct;
};