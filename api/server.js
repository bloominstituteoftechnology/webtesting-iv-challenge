const express = require('express');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json('the line is hot');
});

server.post('/:name', (req, res) => {
    const { name } = req.params;

    res.status(202).json( { heyo: `${name}`})
});

module.exports = server;

