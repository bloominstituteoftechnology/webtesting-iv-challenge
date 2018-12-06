const express = require('express')
const server = express()
server.use(express.json())


server.get('/', (req, res) => {
    res.status(200).json({ message: 'im working' })
})

server.post('/hello/:name', (req, res) => {
    const { name } = req.params
    
    res.status(200).json({ hello: name })
})

module.exports = server;