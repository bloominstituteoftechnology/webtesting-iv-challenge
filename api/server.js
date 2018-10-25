const express = require('express');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({message: 'I GET Stuff!'});
});

server.post('/api/icecream', (req, res) => {
    const { flavor } = req.params;

    res.status(201).json(flavor);
});

server.delete('/api/:id', (req, res) => {
    const {id} = req.params;
    console.log(id, req.params, req.body);

    res.status(200).json(id);
});

module.exports = server;
