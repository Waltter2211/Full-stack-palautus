const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title:"Test Title",
    author:"Test Author",
    url:"Test URL",
    likes:32
  },
  {
    title:"Test Title2",
    author:"Test Author2",
    url:"Test URL2",
    likes:13
  }
]

const initialUsers = [
  {
    username:"Test Title",
    name:"Test Author",
    password:"Test URL"
  },
  {
    username:"Test Title2",
    name:"Test Author2",
    password:"Test URL2"
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs, initialUsers, nonExistingId, blogsInDb, usersInDb
}