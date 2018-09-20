const express = require('express');

const server = express();

server.get('/', (req, res) => {
  res.status(200).json({ server: 'running' })
});

module.exports = server;
