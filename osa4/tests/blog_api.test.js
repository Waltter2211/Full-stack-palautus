const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

describe('api tests getting blogs', () => {
    test('blogs are returned as json', async () => {
        await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })
      
    test('there are two blogs', async () => {
        const response = await api.get('/api/blogs')
        
        assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })
})

describe('api tests creating blog', () => {
    test('id is not _id', async () => {
        const response = await api.get('/api/blogs')
        assert(response.body[0].hasOwnProperty('id'))
    })

    test('a valid note can be added ', async () => {
        const newBlog = {
          
            title:"Test Title123",
            author:"Test Author",
            url:"Test URL",
            likes:32
        }
      
        await api
          .post('/api/blogs')
          .send(newBlog)
          .expect(201)
          .expect('Content-Type', /application\/json/)
      
        const response = await api.get('/api/blogs')
        const title = response.body.map(r => r.title)
      
        assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
      
        assert(title.includes('Test Title123'))
    })

    test('blog always has 0 likes', async () => {
        const newBlog = {
            title:"Test Title123",
            author:"Test Author",
            url:"Test URL"
        }

        await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        const votes = response.body.map(r => r.likes)

        assert(votes[votes.length-1] === 0)
    })
})

describe('deletion of a note', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)

      const title = blogsAtEnd.map(r => r.title)
      assert(!title.includes(blogToDelete.title))
    })
})

after(async () => {
    await mongoose.connection.close()
})