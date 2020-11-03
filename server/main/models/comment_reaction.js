module.exports = (sequelize, DataTypes) => {
  const CommentReaction = sequelize.define(
    'CommentReaction',
    {
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
    },
    { tableName: 'comment_reaction' }
  );

  CommentReaction.associate = db => {
    CommentReaction.belongsTo(db.Comment, {
      foreignKey: {
        name: 'comment_id',
        allowNull: false,
      },
    });

    CommentReaction.belongsTo(db.Reaction, {
      foreignKey: {
        name: 'reaction_id',
        allowNull: false,
      },
    });

    CommentReaction.belongsTo(db.User, {
      foreignKey: {
        name: 'user_id',
        allowNull: false,
      },
    });
  };

  return CommentReaction;
};
