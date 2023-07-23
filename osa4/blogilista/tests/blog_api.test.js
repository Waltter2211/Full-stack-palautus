const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('CRUD test', () => {
  test('right amount of blogs', async () => {
    console.log('test')
    const response = await api.get('/api/blogs')
    console.log(response.body.length)
    expect(response.body).toHaveLength(2)
})

test('to have id', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach((blog) => {
        expect(blog).toHaveProperty('id')
    })
})

test('does post work', async () => {
    const newBlog = {
        title: 'test blog title',
        author: 'test blog author',
        url: 'testblog url',
        likes: 1,
    }

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const title = response.body.map(r => r.title)
  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  expect(title).toContain('test blog title')
})

test('deletion of a note', async () => {
  
  const blogsAtStart = await helper.blogsInDb()
      const blogsToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogsToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd).toHaveLength(
        helper.initialBlogs.length - 1
      )

      const titles = blogsAtEnd.map(r => r.title)

      expect(titles).not.toContain(blogsToDelete.title)
  })
})


afterAll(async () => {
  await mongoose.connection.close()
})