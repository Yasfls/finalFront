export default (sequelize, DataTypes) => {
    const Attachment = sequelize.define('attachment', {
        id_attachment: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        transaction_id: { // Chave estrangeira que aponta para a Transação (lado "Muitos")
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        file_path: { // Caminho do arquivo no disco/storage
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        mimetype: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
    }, {
        // Adicionando timestamps e snake_case para consistência
        timestamps: true,
        underscored: true 
    });

    Attachment.associate = (models) => {
        // 📁 Anexo pertence a uma única Transação (correto, pois tem a FK)
        Attachment.belongsTo(models.Transaction, {
            foreignKey: 'transaction_id',
            as: 'transaction'
        });
    };

    return Attachment;
};
