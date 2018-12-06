const express = require('express');
const server = express();
const db = require('../data/dbConfig');

server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ api: 'running' });
});

server.post('/users', (req, res) => {
    const { firstName, lastName } = req.body;

    res.status(200).json({ welcome: `${firstName} ${lastName}` });
});

server.delete("/users/:id", (req, res) => {
    const { id } = req.params;
    res.status(200).json({ deleted: `${id}` });

});

server.use(express.json())
module.exports = server;