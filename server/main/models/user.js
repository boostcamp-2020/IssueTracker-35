module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      nickname: {
        allowNull: false,
        type: DataTypes.STRING(20),
      },
      password: {
        allowNull: true,
        type: DataTypes.STRING(100),
      },
      image: {
        allowNull: true,
        type: DataTypes.STRING(250),
      },
    },
    { tableName: 'user' }
  );

  return User;
};
