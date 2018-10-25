const express = require('express');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ api: 'running' });
});

server.post('/roster', (req, res) => {
    const name = req.body.player;
    const position = req.body.position;
    res.status(201).json({ 
        id: 1,
        name: `${name}`,
        position: `${position}`
     });
});

server.delete('/roster/:id', (req, res) => {
    const { id } = req.params;
    res.status(200).json({ id });
});


module.exports = server;