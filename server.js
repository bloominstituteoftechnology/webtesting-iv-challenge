const express = require('express');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ success: true, data: { api: 'running' } });
});

server.post('/user', (req, res) => {
    const { name } = req.body;
    console.log('name', name)

    res.status(200).json({ hello: name })
});
server.delete('/user/:id', (req, res) => {
    const { id } = req.params;

    res.status(200).json({ deleted: id })
});

module.exports = server;