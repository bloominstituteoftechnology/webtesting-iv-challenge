const express = require('express');

const server = express();

server.use(express.json());

server.post('/api/:id', (req, res) => {
    const { id } = req.params;
    res.status(200).json(Number(id));
})

server.delete('/api/:id', (req, res) => {
    const { id } = req.params;
    res.status(201).send(Number(id) );
})

module.exports = server;