const express = require('express');
const server = express();

server.use(express.json());

server.get('/', (req, res) =>{
    res.status(200).json({ api:'running' })
})

server.get('/people', (req, res) =>{
    res.status(200).json({ people:'James' })
})

server.post('/people', (req, res) =>{
    res.status(200).json({ people:'James' })
})

server.delete('/people', (req, res) =>{
    res.status(200).json({})
})

module.exports = server;