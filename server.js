const express = require('express');

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ api: 'running' });
});

server.post('/greet', (req, res) => {
    const { name } = req.body;

    res.status(201).json({ hello: name });
});

server.put('/greet/:name', (req, res) => {
    const { name } = req.body;

    res.status(200).json({ hello: `Changed name from ${req.params.name} to ${name}` });
});

server.delete('/greet/:name', (req, res) => {
    res.status(200).json({ removed: req.params.name })
})

module.exports = server;