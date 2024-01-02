export default (sequelize, DataTypes) => {
    const Driver = sequelize.define('Driver', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      vehicleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'vehicles',
          key: 'id',
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      locationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'locations',
          key: 'id',
        },
      },
     
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      truckName:{
        type: DataTypes.STRING,
        allowNull: false
      },
      truckDescription: {
        type: DataTypes.STRING,
        allowNull: false
      },
        
      
      
      
    }, {
      tableName: 'drivers',
      underscored: true,
      name: {
        singular: 'Driver',
        plural: 'Drivers',
      },
    });
  
    Driver.associate = models => {
      models.Driver.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id' });
      models.Driver.belongsTo(models.Vehicle, { foreignKey: 'vehicleId', targetKey: 'id' });
      models.Driver.belongsTo(models.Location, { foreignKey: 'locationId', targetKey: 'id' });
    };
    
   
    return Driver;
  };
  