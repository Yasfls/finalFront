export default (sequelize, DataTypes) => {
  const Category = sequelize.define('category', {
    id_category: {
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
  });

  Category.associate = (models) => {
    // 💰 Alterado: Categoria tem muitas Transações (em vez de Produtos)
    Category.hasMany(models.Transaction, { 
      foreignKey: 'category_id',
      as: 'transactions' // Novo alias
    });
  };

  return Category;
};