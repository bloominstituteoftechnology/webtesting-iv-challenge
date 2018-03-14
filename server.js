const express = require('express');
const morgan = require('morgan');

const server = express();
server.use(morgan('combined'));
server.use(express.json());

server.get('/', (req, res) => {
  res.send({ api: 'r u n n i n g . . .' });
});

module.exports = server;
