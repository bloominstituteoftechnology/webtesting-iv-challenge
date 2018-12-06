const express = require('express');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ message: 'server is up' });
});


server.post('/user', (req, res) => {
    const { firstName, lastName, password } = req.body;
    !firstName || !lastName || !password
        ? res.status(404).json({ message: `all fields required` })
        : res.status(200).json({ message: `${firstName} ${lastName}` })
});

server.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.status(404).json({ message: `id required` })
    }
    else {
        res.status(200).json({ message: `${id}` })
    };
});

module.exports = server;