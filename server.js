const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const server = express();
server.use(bodyParser.json());

server.use(morgan('combined'));
server.get('/app', (req, res) => {
  res.send('I am here');
});

module.exports = server;