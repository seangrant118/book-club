module.exports = (sequelize, Sequelize) => {
  const Comments = sequelize.define("comment", {
    id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
    comment: { type: Sequelize.TEXT, notEmpty: true },

  })

  return Comments;
}