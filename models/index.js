const Blog = require('./blog')
const User = require('./user')
const Readinglist = require('./readinglist')
const Logout = require('./readinglist')

User.hasMany(Blog)
Blog.belongsTo(User)


User.belongsToMany(Blog, { through: Readinglist });
Blog.belongsToMany(User, { through: Readinglist });


module.exports = {
  Blog, User, Readinglist
}