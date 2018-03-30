const express = require('express');
const morgan = require('morgan');

const server = express();
server.use(morgan('combined'));
server.use(express.json());

server.post('/user', (req, res) => {
    res.send(req.body);
});

server.get('/users', (req, res) => {
    res.json('Hello World');
});


module.exports = server;