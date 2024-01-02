
export default (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    
    timestamp: DataTypes.DATE,
  }, {
    tableName: 'locations',
    underscored: true,
    name: {
      singular: 'skill',
      plural: 'skills',
    },
  });

  Location.associate = models => {
    models.Location.belongsTo(models.Driver, { foreignKey: 'locationId', targetId: 'id' });
  };
  return Location;
};
