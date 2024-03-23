const config = require('./utils/config')
const logger = require('./utils/logger')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')

mongoose.set('strictQuery', false)

const mongoUrl = process.env.MONGODB_URI
mongoose.connect(mongoUrl)
.then(success => logger.info("connected to MongoDB"))
.catch(err => logger.error(err))

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

module.exports = app