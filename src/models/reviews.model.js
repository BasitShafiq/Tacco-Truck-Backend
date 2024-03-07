export default (sequelize, DataTypes) => {
    const Review = sequelize.define('Review',
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                },
            },
            rating: {
                type: DataTypes.FLOAT,
            },
            feedback: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            vehicle_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'vehicles',
                    key: 'id',
                },
            },
            createdAt: {
                type: DataTypes.DATE,
                defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updatedAt: {
                type: DataTypes.DATE,
                defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            },
        },
        {
            tableName: 'reviews',
            underscored: true,
        }
    );

    Review.associate = (models) => {
        Review.belongsTo(models.User, { foreignKey: 'user_id' });
    };

    return Review;
};
