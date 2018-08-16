const express = require('express');
const server = express();

server.use(express.json());

server.get('/users', (req, res) => {
    res.status(200).json({users: 'array of users'});
})

server.post('/users', (req, res) => {
    const {name, id} = req.body;
    res.status(201).json({name: name, id: id});
})

module.exports = server;