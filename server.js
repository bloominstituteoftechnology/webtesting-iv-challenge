const express = require('express')

// initialize server

const server = express()

// Middleware
server.use(express.json())

// Endpoints
server.post('/create', (req, res) => {
    const creds = req.body
    res.status(200).json(creds)
})

server.delete('/remove/:id', (req, res) => {
    const {id} = req.params
    res.status(200).json(id)
})

// Sanity Check
server.get('/', (req, res) => {
    res.status(200).json({api: 'alive!'})
})

module.exports = server