const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const server = express();
server.use(bodyParser.json());
server.use(morgan('combined'));

server.get('/', (req, res) => {
  res.send('Hello!');
});

module.exports = server;
