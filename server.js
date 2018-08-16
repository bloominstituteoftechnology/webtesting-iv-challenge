const express = require('express');
const server = express();

server.get('/', (req, res) => {
  res.status(200).end()
});

server.post('/', (req, res) => {
  res.status(200).json({"hello": "batman"});
});

server.delete('/', (req, res) => {
  res.status(202).end()
});

module.exports = server;
 