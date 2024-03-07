export default (sequelize, DataTypes) => {
  const Vehicle = sequelize.define('Vehicle',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: DataTypes.STRING,
      registration_number: DataTypes.TEXT,
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
    },
    {
      tableName: 'vehicles',
      underscored: true,
    }
  );

  Vehicle.associate = models => {
    Vehicle.belongsTo(models.User, { foreignKey: 'user_id', targetKey: 'id' });
  };
  return Vehicle;
};
