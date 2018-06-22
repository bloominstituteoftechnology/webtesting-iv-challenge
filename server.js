const express = require('express')
const server = express()
const mongoose = require('mongoose')
const User = require('./users/User')

server.use(express.json())

server.delete('/api/users', (req, res) => {
    let id = req.body.id
    // id === undefined ? res.status(400).json({ error: 'Please provide a correct ID' }) : null
    id.length !== 24 ? res.status(400).json({ error: 'Please provide a correct ID' }) : null

    User
        .findByIdAndRemove(id)
        .then(user => res.status(204))
        .catch(error => res.status(500))
})


server.post('/api/users', (req, res) => {
    let { password } = req.body
    password.length <= 4 ? res.status(400).json({ error: 'Please provide a secure Password' }) : null
    User
        .create(req.body)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(err => res.status(500))
})

server.get('/', (req, res) => {
    res.status(200).json({ api: 'running' })
})

mongoose.connect('mongodb://localhost/testdb')
module.exports = server;