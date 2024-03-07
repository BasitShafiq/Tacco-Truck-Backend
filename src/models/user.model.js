import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User',
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
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      gender: {
        type: DataTypes.ENUM('Male', 'Female', 'Other'),
      },
      role: {
        type: DataTypes.ENUM('User', 'Driver'),
      },
      status: {
        type: DataTypes.STRING,

      },
      profile_image: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      date_of_birth: {
        type: DataTypes.DATEONLY,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      },
    }, {
    tableName: 'users',
    underscored: true,
    timestamps: false,
  });

  User.associate = models => {
    models.User.hasOne(models.Vehicle, { foreignKey: 'user_id', sourceKey: 'id' });
  };

  User.beforeCreate(async (user) => {
    if (user.changed('password')) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
    }
  });

  User.beforeUpdate(async (user) => {
    if (user.changed('password')) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
    }
  });



  return User;
};