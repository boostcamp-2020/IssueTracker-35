module.exports = (sequelize, DataTypes) => {
  const IssueLabel = sequelize.define(
    'IssueLabel',
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

  IssueLabel.associate = db => {
    IssueLabel.belongsTo(db.Issue, {
      foreignKey: {
        name: 'issue_id',
        allowNull: false,
      },
    });

    IssueLabel.belongsTo(db.Label, {
      foreignKey: {
        name: 'label_id',
        allowNull: false,
      },
    });
  };

  return IssueLabel;
};
