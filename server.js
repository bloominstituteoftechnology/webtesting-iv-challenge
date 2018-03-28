const express = require('express');
const morgan = require('morgan');

const server = express();
server.use(morgan('combined'));
server.use(express.json());

server.get('/whatever', (req, res) => {
  res.json('Hello World');
});

module.exports = server;
