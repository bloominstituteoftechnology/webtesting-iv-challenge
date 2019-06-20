const express = require('express')

const server = express()

server.use(express.json())

server.get('/', (req, res) => {
    res.send('Server up and running')
})

module.exports = server;