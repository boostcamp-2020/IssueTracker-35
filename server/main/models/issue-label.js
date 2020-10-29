module.exports = (sequelize, DataTypes) => {
  const Issue_label = sequelize.define(
    'Issue_label',
    {
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
    },
    { tableName: 'issue_label' }
  );

  Issue_label.associate = db => {
    Issue_label.belongsTo(db.Issue, {
      foreignKey: {
        name: 'issue_id',
      },
    });

    Issue_label.belongsTo(db.Label, {
      foreignKey: {
        name: 'label_id',
      },
    });
  };

  return Issue_label;
};
