const express = require('express');
const hobbits = require('./hobbitsModel');
const db = require('../data/dbConfig');


const server = express();
server.use(express.json());

server.post('/hobbits', (req, res) => {
    res.status(201).json(req.body);
})

server.delete('/hobbits', (req, res) => {
    res.status(201).json(req.body);

})


const port  = process.env.PORT || 9001;

module.exports = server;

