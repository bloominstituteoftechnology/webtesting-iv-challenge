const express = require('express');
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ api: 'running' });
});

server.post('/', (req, res) => {
    const { first, last } = req.body;

    res.status(200).json({ hello: `${first} ${last}` });
});

server.post('/greet/:name', (req, res) => {
    const { lastName } = req.body;
    const { name } = req.params;

    res.status(200).json({ hello: `${name} ${lastName}` });
});

module.exports = server;
