const router = require('express').Router()
const jwt = require('jsonwebtoken')
require('dotenv').config()

const { User } = require('../models')

router.post('/', async (req, res) => {
    try {
        const user = await User.findOne({ where: { username: req.body.username } })
        const passwordCorrect = user.password === 'testpass'

        if (!user && passwordCorrect) {
            res.status(401).end({error: 'invalid username or password'})
        }

        const userForToken = {id: user.id, username: user.username}
        const token = jwt.sign(userForToken, process.env.JWT_SECRET)

        res.send({ token, name: user.name, username: user.username })
    } catch (error) {
        console.log(error)
    }
})

module.exports = router