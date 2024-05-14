const router = require('express').Router()

const { User, Blog } = require('../models')
const { sequelize } = require('../util/db')

router.get('/', async (req, res) => {
    const users = await Blog.findAll({
        attributes: {
            exclude: ['id', 'url', 'title', 'likes', 'userId'],
            include: [[sequelize.fn('COUNT', sequelize.col('likes')), 'blogs'],
            [sequelize.fn('SUM', sequelize.col('likes')), 'likes']]
        },
        group: ['author']
    })
    res.send(users)
})

module.exports = router