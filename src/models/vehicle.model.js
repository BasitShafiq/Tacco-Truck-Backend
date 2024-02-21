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
      category_id: {
        type: DataTypes.INTEGER,
        // references: {
        //   model: 'Categories',
        //   key: 'id',
        // },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: DataTypes.STRING,
      registration_number: DataTypes.TEXT,
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    }, {
    tableName: 'vehicles',
    underscored: true,
  }
  );

  Vehicle.associate = models => {
    Vehicle.hasMany(models.Category, { foreignKey: 'id', targetKey: 'id' });
    Vehicle.hasMany(models.Driver, { foreignKey: 'vehicle_id', sourceKey: 'id' });
  };

  return Vehicle;
};
