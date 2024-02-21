export default (sequelize, DataTypes) => {
  const Driver = sequelize.define('Driver', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    vehicle_id: {
      type: DataTypes.INTEGER,
      // references: {
      //   model: 'vehicles',
      //   key: 'id',
      // },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // references: {
      //   model: 'users',
      //   key: 'id',
      // },
    },
    license_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
  }, {
    tableName: 'drivers',
    underscored: true,
  });

  Driver.associate = models => {
    models.Driver.belongsTo(models.Vehicle, { foreignKey: 'vehicle_id', targetKey: 'id' });
    models.Driver.belongsTo(models.User, { foreignKey: 'user_id', targetKey: 'id' });
  };

  return Driver;
};
