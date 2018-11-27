module.exports = (sequelize, Sequelize) => {
  const Comments = sequelize.define("comments", {
    id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
    comment: { type: Sequelize.TEXT, notEmpty: true },
    isReply: { type: Sequelize.BOOLEAN, default: false },
    parentId: { type: Sequelize.INTEGER }
  })

  Comments.associate = function(models) {
    Comments.belongsTo(models.user, {
      foreignKey: {
        allowNull: false
      }
    })
    Comments.belongsTo(models.post, {
      foreignKey: {
        allowNull: false
      }
    })
  }

  return Comments;
}