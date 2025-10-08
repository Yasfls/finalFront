export default (sequelize, DataTypes) => {
    const Attachment = sequelize.define('attachment', {
        id_attachment: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        transaction_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        file_path: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        mimetype: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
    }, {
        timestamps: true,
        underscored: true 
    });

    Attachment.associate = (models) => {
        Attachment.belongsTo(models.Transaction, {
            foreignKey: 'transaction_id',
            as: 'transaction'
        });
    };

    return Attachment;
};
