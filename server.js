const express = require('express');
const server = express();

server.get('/', (req, res) => {
    res.status(200).json({ api: 'running'});
});

server.post('/users', (req, res) => {
    let { username, password } = req.body;
    User.create({ username, password })
        .then(user => res.status(201).json(user))
        .catch(err => res.status(500).json(err))
})

server.delete('/users/:id', (req, res) => {
    let { id } = req.params;
    User.findByIdAndRemove(id)
    .then(user => res.status(200).json(user))
    .catch(err =>  res.status(500).json(err))
});

module.exports = server;