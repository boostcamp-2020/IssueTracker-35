module.exports = (sequelize, DataTypes) => {
  const Reaction = sequelize.define(
    'Reaction',
    {
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      emoji: {
        allowNull: false,
        type: DataTypes.STRING(10),
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(20),
      },
    },
    { tableName: 'reaction' }
  );

  return Reaction;
};
