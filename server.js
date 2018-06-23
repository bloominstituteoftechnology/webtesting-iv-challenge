const express = require('express');
const mongoose = require('mongoose');
const server = express();
const User = require('./users/User');

server.use(express.json());

// GET method to main path or endpoint:

server.get('/', (req, res) => {
    res.status(200).json({ api: 'Running...' });
});

// POST method to /api/users path or endpoint:

server.post('/api/users', (req, res) => {
    let { username, password } = req.body;
    password.length <= 10 ? res.status(400).json({ error: 'Password is weak. Please provide more characters.' }) : null
    User.create(req.body)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(err => {
            res.status(500).json(err)
        })
});

// server.get('/api/users', (req, res) => {
//     User.find()
//     let { username, password } = req.body;
//     User.create({ username, password })
//         .then(user => res.status(201).json(user))
//         .catch(err => res.status(500).json(err))
// });

// Delete method to /api/users path or endpoint:

server.delete('api/users/', (req, res) => {
    let { id } = req.body.id;
    id.length !== 24 ? res.status(400).json({ error: 'Please provide correct ID.' }) : null
    User.findByIdAndRemove(id)
        .then(user => {
            res.status(204).json(user)
        })
        .catch(err => {
            res.status(500).json(err)
        })
});

mongoose.connect('mongodb://localhost/server-testing-db');
module.exports = server;