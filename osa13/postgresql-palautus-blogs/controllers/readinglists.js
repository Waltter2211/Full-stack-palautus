const router = require('express').Router()

const { UserBlog } = require('../models')

router.post('/', async (req, res) => {
    try {
        const userBlogObj = {
            blogId: req.body.blog_id,
            userId: req.body.user_id
        }
        await UserBlog.create(userBlogObj)
        res.send(userBlogObj)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router