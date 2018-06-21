const express = require('express');
const mongoose = require('mongoose');

const server = express();
const User = require('./User/User.js');

server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ api: 'running' });
});

server.post('/users', (req, res) => {
    let { username , password } = req.body;
    User.create({ username , password })
        .then(user => res.status(201).json(user))
        .catch(err => res.status(555).json(err))
});

module.exports = server;