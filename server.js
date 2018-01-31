const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const server = express();

server.use(bodyParser.json());
server.use(morgan('dev'));

server.get('/', (req, res) => {
  res.send('hello world');
});

server.post('/band', (req, res) => {
  res.send(req.body);
});

module.exports = server;