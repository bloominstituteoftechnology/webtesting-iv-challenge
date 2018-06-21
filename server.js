const express = require('express')
server = express()

server.get('/', (req, res) => {
    res.status(200).json({ api: 'running' })
})
server.post('/delete', (req, res) => {
    res.status(204)
})
module.exports = server;