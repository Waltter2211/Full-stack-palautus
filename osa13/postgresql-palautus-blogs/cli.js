require('dotenv').config()

const { Sequelize, DataTypes, Model } = require('sequelize');

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

const showBlogs = async () => {
    try {
        const blogs = await Blog.findAll()
        blogs.forEach(blog => {
            console.log(`${blog.dataValues.author}: ${blog.dataValues.title}, ${blog.dataValues.likes} likes`)
        })
        sequelize.close()
    } catch (error) {
        console.log(error)
    }
}

showBlogs()