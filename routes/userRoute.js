const router = require('express').Router()
const User = require('../users/User')

router.post('/delete', (req, res) => {
    let { id } = req.body
    id === undefined ? res.status(400).json({ error: 'Please provide a correct ID' }) : null
    id.length !== 24 ? res.status(400).json({ error: 'Please provide a correct ID' }) : null

    User
        .findByIdAndRemove(id)
        .then(user => {
            res.status(204).json(user)
        })
        .catch(error => res.status(500).json(error))
})

