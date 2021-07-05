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

server.delete('/users/:id', (req, res) => {
    const {id} = req.params;
    res.status(200).json({deleted: id})
})

server.put('/users/:id', (req, res) => {
    const {name, id} = req.body;
    res.status(200).json({name: name, id: id})
})

module.exports = server;