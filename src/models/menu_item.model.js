export default (sequelize, DataTypes) => {
  const MenuItem = sequelize.define('MenuItem',
   {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    vehicle_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references : {
        model : 'vehicles',
        key : 'id'
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
  }, 
  {
    tableName: 'menu_items',
    underscored: true,
  });

  MenuItem.associate = models => {
    MenuItem.belongsTo(models.Vehicle, { foreignKey: 'vehicle_id', targetKey: 'id' });
  };

  return MenuItem;
};
