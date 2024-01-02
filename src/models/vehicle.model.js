

export default (sequelize, DataTypes) => {
    const Vehicle = sequelize.define('Vehicle',
     {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      license_plate: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      vehicle_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      brand: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      model: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,

      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    }, {
      tableName: 'vehicles',
      underscored: true,
      name: {
        singular: 'Vehicle',
        plural: 'Vehicles',
      },
    });
    Vehicle.associate = models => {
      models.Vehicle.hasOne(models.Driver, { foreignKey: 'vehicleId', targetId: 'id' });
    };
    
    return Vehicle;
  };
  