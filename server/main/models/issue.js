module.exports = (sequelize, DataTypes) => {
  const Issue = sequelize.define(
    'Issue',
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
        allowNull: false,
      },
    });

    Issue.belongsTo(db.User, {
      foreignKey: {
        name: 'user_id',
        allowNull: false,
      },
    });
  };
  return Issue;
};
