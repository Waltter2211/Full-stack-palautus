const User = require('./user')
const Blog = require('./blog')
const UserBlogs = require('./userBlogs')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: UserBlogs })
Blog.belongsToMany(User, { through: UserBlogs })

/* User.sync({ alter: true })
Blog.sync({ alter: true }) */

module.exports = {
  Blog, User, UserBlogs
}