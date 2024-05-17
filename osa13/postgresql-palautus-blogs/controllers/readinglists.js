const router = require('express').Router()

const { UserBlog, User } = require('../models')
const jwtVerifier = require('../util/jwtVerifier')

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

router.put('/:id', jwtVerifier, async (req, res) => {
    try {
        const userBlog = await UserBlog.findByPk(req.params.id)
        if (userBlog && req.decodedToken.id === userBlog.userId) {
            userBlog.read = req.body.read
            await userBlog.save()
            res.send(userBlog)
        } else {
            res.status(401).send({message: "cannot change other users readings"})
        }
    } catch (error) {
        console.log(error)
    }
})

module.exports = router