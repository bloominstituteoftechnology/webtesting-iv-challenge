const express = require('express')
const server = express()
const db = require('./data/dbConfig.js')
server.use(express.json())



server.get('/', (req, res) => {
    res.status(200).json({ message: 'im working' })
})

server.post('/hello', (req, res) => {
    const { firstName, lastName } = req.body
    
    res.status(200).json({ hello: `${firstName} ${lastName}` })
})

server.post('/user', (req, res) => {
    const name   = req.body

    db('users')
    .insert(name)
    .then(id => {
        res.status(201).json(id)
    })
    .catch(err => {
        res.status(500).json({ err })
    })
})

module.exports = server;