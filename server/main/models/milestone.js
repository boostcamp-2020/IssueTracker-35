module.exports = (sequelize, DataTypes) => {
  const Milestone = sequelize.define(
    'Milestone',
    {
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      due_date: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      content: {
        allowNull: false,
        type: DataTypes.STRING(1000),
      },
    },
    { tableName: 'milestone' }
  );

  return Milestone;
};
