const router = require('express').Router()
const jwt = require('jsonwebtoken')

const { Blog, User } = require('../models')

const blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id)
    next()
}

const jwtVerifier = async (req, res, next) => {
    const authorizationToken = req.get('authorization')

    if (authorizationToken && authorizationToken.toLowerCase().startsWith('bearer')) {
        try {
            req.decodedToken = jwt.verify(authorizationToken.substring(7), process.env.JWT_SECRET)
            console.log(req.decodedToken)
        } catch (error) {
            console.log(error)
            return res.status(401).send({ error: 'token invalid' })
        }
    } else {
        return res.status(401).send({ error: 'token missing' })
    }
    next()
}

router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.findAll({
            attributes: { exclude: ['userId'] },
            include: {
                model: User,
                attributes: ['name']
            }
        })
        res.send(blogs)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

router.get('/:id', blogFinder, async (req, res) => {
    try {
        if (req.blog) {
            res.send(req.blog)
        } else {
            res.status(404).end()
        }
    } catch (error) {
        console.log(error)
        next(error)
    }
})

router.post('/', jwtVerifier, async (req, res) => {
    try {
        const user = await User.findByPk(req.decodedToken.id)
        const blog = await Blog.create({...req.body, userId: user.id})
        res.send(blog)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

router.put('/:id', blogFinder, async (req, res, next) => {
    try {
        req.blog.likes = req.body.likes
        await req.blog.save()
        res.json({likes: req.blog.likes})
    } catch (error) {
        console.log(error)
        next(error)
    }
})

router.delete('/:id', jwtVerifier, blogFinder, async (req, res) => {
    try {
        if (req.blog) {
            await req.blog.destroy()
            res.json(req.blog)
        } else {
            res.status(404).end()
        }
    } catch (error) {
        console.log(error)
    }
})

module.exports = router