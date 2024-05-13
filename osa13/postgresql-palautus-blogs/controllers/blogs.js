const router = require('express').Router()

const { Blog } = require('../models')

const blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id)
    next()
}

router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.findAll()
        res.send(blogs)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

router.get('/:id', blogFinder, async (req, res) => {
    try {
        if (req.blog) {
            
        } else {
            res.status(404).end()
        }
    } catch (error) {
        console.log(error)
        next(error)
    }
})

router.post('/', async (req, res) => {
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

router.delete('/:id', blogFinder, async (req, res) => {
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