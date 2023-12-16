export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      field: 'name',
    },

    email: DataTypes.STRING,
    gender: {
      type: DataTypes.ENUM,
      values: ['Male', 'Female', 'Other'],
    },
    profile_image: {
      type: DataTypes.STRING,
      field: 'profile_image',
    },
    password: DataTypes.STRING,
    date_of_birth: {
      type: DataTypes.DATEONLY,
      field: 'date_of_birth',
    },
    created_at: {
      type: DataTypes.DATE,
      field: 'created_at',
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      field: 'updated_at',
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'users',
    underscored: true,
  });

  User.associate = models => {
    User.hasMany(models.Skill, { foreignKey: 'user_id', sourceKey: 'id' });
  };

  return User;
};