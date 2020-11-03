module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'Comment',
    {
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      content: {
        allowNull: true,
        type: DataTypes.STRING(500),
      },
      is_issue: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
    },
    { tableName: 'comment' }
  );
  Comment.associate = db => {
    Comment.belongsTo(db.Issue, {
      foreignKey: {
        name: 'issue_id',
        allowNull: false,
      },
    });

    Comment.belongsTo(db.User, {
      foreignKey: {
        name: 'user_id',
        allowNull: false,
      },
    });
  };
  return Comment;
};
