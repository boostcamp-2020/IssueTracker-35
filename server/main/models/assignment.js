module.exports = (sequelize, DataTypes) => {
  const Assignment = sequelize.define(
    'Assignment',
    {
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
    },
    { tableName: 'assignment' }
  );

  Assignment.associate = db => {
    Assignment.belongsTo(db.User, {
      foreignKey: {
        name: 'assignee',
      },
    });

    Assignment.belongsTo(db.Issue, {
      foreignKey: {
        name: 'issue_id',
      },
    });
  };

  return Assignment;
};
