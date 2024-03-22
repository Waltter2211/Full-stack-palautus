const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})
  
blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  
  await blog.save()
  response.status(201).json(blog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete({_id: request.params.id})
  response.status(204).send('deleted')
})

module.exports = blogsRouter