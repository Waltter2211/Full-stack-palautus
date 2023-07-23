const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'HTML is easy',
    author: 'risto',
    url: 'päivi',
    likes: 1
  },
  {
    title: 'Browser can execute only JavaScript',
    author: 'test',
    url: 'yykaakoo',
    likes: 2
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'deletesoon' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}