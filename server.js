const express = require('express');
const User = require('./users/User');

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    res.status(201).send({ API: 'API RUNNING' })
});

server.get('/users', (req, res) => {
    User
        .find()
        .then(users => res.status(200).json(users))
        .catch(err => res.status(500).json({ errorMessage: 'error fetching users' }))
});

server.get('/users/:id', (req, res) => {
    const { id } = req.params;
    
    User
        .findById(id)
        .then(user => res.status(200).json(users))
        .catch(err => res.status(500).json({ errorMessage: 'error locate user' }));
});

server.post('/users', (req, res) => {
    const user = req.body;

    User
        .create(user)
        .then(user => res.status(201).json(user))
        .catch(err => res.status(500).json({ errorMessage: 'error saving user' }));
});

server.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    User
        .findByIdAndRemove(id)
        .then(success => res.status(200).json({ success: 'user successfully deleted' }))
        .catch(err => res.status(500).json({ errorMessage: 'error removing user' }));
});

process.env.NODE_ENV !== 'test' ? server.listen(9000) : null;

module.exports = server;