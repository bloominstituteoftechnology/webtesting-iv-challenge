const express = require('express');
const db = require('./data/dbConfig.js');

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ api: 'running' });
});

server.post('/', (req, res) => {
    const { name } = req.body;
    res.status(201).json({ name });
});

server.delete('/:id', (req, res) => {
    const id = req.params.id;
    if(id) {
        res.status(200).json({ message: 'Delete succesfull.' });
    } else {
        res.status(500).json({ message: 'Please specify ID.'})
    };
    
});

module.exports = server;