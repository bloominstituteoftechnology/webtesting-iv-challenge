const express = require('express');
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send({ message: 'here we is!' });
})

server.post('/api/register', (req, res) => {
    const body = req.body;
    res.status(200).json({ message: `welcome to the club ${body.name}!`});
})

server.delete('/api/delete/:id', (req, res) => {
    const id = req.params.id;
    res.status(201).json({ message: `user id of ${id} has been deleted`});
})

module.exports = server;