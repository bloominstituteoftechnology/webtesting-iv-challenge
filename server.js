const express = require('express');
const morgan = require('morgan');

const server = express();
server.use(morgan('combined'));
server.use(express.json());

server.post('/team', (req, res) => {
  res.send(req.body);
});

server.get('/teams', (req, res) => {
    console.log('Hello World!');
    res.json();
});

module.exports = server;