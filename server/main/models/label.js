module.exports = (sequelize, DataTypes) => {
  const Label = sequelize.define(
    'Label',
    {
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING(20),
      },
      content: {
        allowNull: true,
        type: DataTypes.STRING(100),
      },
      color: {
        allowNull: false,
        type: DataTypes.STRING(6),
      },
    },
    { tableName: 'label' }
  );

  return Label;
};
