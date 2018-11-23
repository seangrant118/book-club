module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define("post", {
    id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
    title: { type: Sequelize.STRING, notEmpty: true },
    body: { type: Sequelize.STRING, notEmpty: true },
    img: { type: Sequelize.String, allowNull: false }
  })

  return Post;
}