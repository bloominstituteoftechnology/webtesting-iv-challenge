const express = require('express');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res
    .status(418)
    .json();
})

module.exports = server;