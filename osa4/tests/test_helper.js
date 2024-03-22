const Blog = require('../models/blog')

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

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}