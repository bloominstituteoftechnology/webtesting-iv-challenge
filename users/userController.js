const router = require('express').Router()
const User = require('./User')

router.post('/register', (req, res) => {
    // const { username, password } = req.body
    User.create(req.body)
        .then( user => {
            res.status(201).json(user)
        })
        .catch( err => {
            res.status(500).json(err.message)
        })
})

module.exports = router