export default (sequelize, DataTypes) => {
    const Driver = sequelize.define('Driver', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        },
      },
      vehicleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'vehicle',
          key: 'id',
        },
      },
      
      
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    }, {
      tableName: 'Driver',
      underscored: true,
      name: {
        singular: 'Driver',
        plural: 'Drivers',
      },
    });
  
    Driver.associate = models => {
      models.Skill.belongsTo(models.User, { foreignKey: 'userId', targetId: 'id' });
    };
    Driver.associate = models => {
      models.Skill.belongsTo(models.Vehicle, { foreignKey: 'vehicleId', targetId: 'id' });
    };
    return Driver;
  };
  