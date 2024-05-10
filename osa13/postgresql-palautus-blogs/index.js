require('dotenv').config()
const { Sequelize, DataTypes, Model } = require('sequelize');
const express = require('express')

const app = express()
app.use(express.json())
const sequelize = new Sequelize(process.env.POSTGRES_URL)

class Blog extends Model {}

Blog.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    author: {
        type: DataTypes.TEXT,
    },
    url: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'blog'
})

app.get('/', (req, res) => {
    res.send('ping')
})

app.get('/api/blogs', async (req, res) => {
    try {
        const blogs = await Blog.findAll()
        res.send(blogs)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

app.post('/api/blogs', async (req, res) => {
    try {
        const blog = req.body
        console.log(blog)
        await Blog.create(blog)
        res.send('success')
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`app connected to ${PORT}`)
})