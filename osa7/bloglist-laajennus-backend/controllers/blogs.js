const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}
  
blogsRouter.post('/', async (request, response) => {
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(decodedToken.id)
  const blog = new Blog(request.body)
  console.log(blog)
  if (blog.title === '' || blog.author === '' || blog.url === '') {
    response.status(500).send({ error:'please fill all the fields' })
  }
  else {
    blog.user = user._id
    user.blogs = user.blogs.concat(blog._id)
    await user.save()
    await blog.save()
    response.status(201).json(blog)
  }
})

blogsRouter.put("/:id", async (request, response) => {
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  
  try {
    let blog = await Blog.findOne({_id: request.params.id})
    blog.likes += 1
    await Blog.findByIdAndUpdate({_id: request.params.id}, blog)
    response.send({ message: "updated" })
  } catch (error) {
    console.log(error)
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  try {
    await Blog.findByIdAndDelete({_id: request.params.id})
    response.status(204).send({message: 'deleted'})
  } catch (error) {
    console.log(error)
  }
})

blogsRouter.post('/:id/comments', async (request, response) => {
  try {
    if (request.body === '') {
      response.status(500).json({ error: 'please add text to comment' })
    }
    else {
      console.log(request.body)
      let blog = await Blog.findOne({_id: request.params.id})
      console.log(blog.comments)
      blog.comments = blog.comments.concat(request.body.comments)
      await blog.save()
      response.json({ message: 'added comment' })
    }
  } catch (error) {
    console.log(error)
  }
})

module.exports = blogsRouter