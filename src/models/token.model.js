export default (sequelize, DataTypes) => {
    const Token = sequelize.define('Token', {

        token: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            // references: {
            //     model: 'users',
            //     key: 'id',
            // },
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },

    }, {
        tableName: 'tokens',
        underscored: true,
        timestamps: false,
    });

    return Token;
};
