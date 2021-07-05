const express = require('express');

const server = express();

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

server.post('/create', (req, res) => {
  res.status(200).json({ hello: 'amon kimsey' });
});

module.exports = server;