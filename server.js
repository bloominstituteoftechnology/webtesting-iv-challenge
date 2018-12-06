const express = require('express')
const server = express()
server.use(express.json())


server.get('/', (req, res) => {
    res.status(200).json({ message: 'im working' })
})

server.post('/hello', (req, res) => {
    const { firstName, lastName } = req.body
    
    res.status(200).json({ hello: `${firstName} ${lastName}` })
})

module.exports = server;