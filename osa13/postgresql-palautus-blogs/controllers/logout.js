const router = require('express').Router()
const jwt = require('jsonwebtoken')
require('dotenv').config()

const { User } = require('../models')

const Session = require('../models/session')

router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id)

        if (user && user.disabled === false) {
            user.disabled = true
            await user.save()
            await Session.destroy({ where: {user_id: req.params.id} })
            res.send({ message: 'logged out' })
        } else {
            res.status(404).send({ error: 'user not found' })
        }
    } catch (error) {
        console.log(error)
    }
})

module.exports = router