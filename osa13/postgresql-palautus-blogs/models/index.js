const User = require('./user')
const Blog = require('./blog')
const UserBlog = require('./userBlog')
const Session = require('./session')

User.belongsToMany(Blog, { through: UserBlog, as: 'readBlogs' })
Blog.belongsToMany(User, { through: UserBlog, as: 'usersMarked' })

/* User.hasMany(Blog)
Blog.belongsTo(User) */

User.hasMany(UserBlog)
UserBlog.belongsTo(User)

Blog.hasMany(UserBlog)
UserBlog.belongsTo(Blog)

User.hasOne(Session)
Session.belongsTo(User)

/* User.sync({ alter: true })
Blog.sync({ alter: true }) */

module.exports = {
  Blog, User, UserBlog
}