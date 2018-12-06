const express = require('express');
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send({ message: 'here we is!' });
})

module.exports = server;