const express = require('express');
const bodyParser = require('bodyParser');
const morgan = require('morgan');

const server = express();
server.use(bodyParser.json());
server.use(morgan('dev'));

server.get('/', (req, res) => {
  res.send('SERVEERRR');
});

module.exports = { server };
