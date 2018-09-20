const express = require('express');

const server = express();

server.use(express.json());


server.get('/', (req, res) => {
    res.json('API Running...');
});

server.post('/api/dogs', (req, res) => {
    const { breed } = req.body;

    res.status(201).json({ breed: breed });
});

module.exports = server;