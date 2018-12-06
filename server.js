const express = require('express');
const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    res.send({API: 'live'})
})

server.post('/post', (req, res) => {
    res.status().json()
})

module.exports = server;