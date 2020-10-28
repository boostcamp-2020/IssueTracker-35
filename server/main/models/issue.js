module.exports = (sequelize, DataTypes) => {
  const Issue = sequelize.define(
    'Statement',
    {
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING(50),
      },
      content: {
        allowNull: false,
        type: DataTypes.STRING(500),
      },
      is_open: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
    },
    { tableName: 'issue' }
  );
  Issue.associate = db => {
    Issue.belongsTo(db.Milestone, {
      foreignKey: {
        name: 'milestone_id',
      },
    });
    Issue.belongsTo(db.User, {
      foreignKey: {
        name: 'user_id',
      },
    });
  };
  return Issue;
};
