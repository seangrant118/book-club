module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define("post", {
    id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
    title: { type: Sequelize.STRING, notEmpty: true },
    body: { type: Sequelize.TEXT, notEmpty: true },
    img: { type: Sequelize.String, allowNull: false }
  })

  Post.associate = function(models) {
    Post.belongsTo(models.user, {
      foreignKey: {
        allowNull: false
      }
    })
    Post.hasMany(models.comments)
  }

  return Post;
}