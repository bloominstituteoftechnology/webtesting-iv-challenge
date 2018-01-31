const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const server = express();

server.use(morgarn('combined'));
server.use(bodyParser.json());

server.get('/', (req,res) => {
  res.send('Connected to server!');
});

module.exports = server;