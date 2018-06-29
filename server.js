const express = require('express');
const server = express();

const User = require('./User'); 

server.get('/', (req, res) => {
    res.status(200).json({ api: 'Server running' });
});

server.post('/users', (req, res) => {
    const { username, password } = req.body;
    User
        .create({ username, password })
        .then(newUser => {
            res.status(201).json({ newUser })
        })
        .catch(error => {
            res.status(500).json(error)
        })
})

module.exports = server;