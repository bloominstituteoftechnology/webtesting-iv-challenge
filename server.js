const express = require('express');

const server = express();

server.get('/', (req, res) => {
  res.json({ api: 'Working' });
});

module.exports = server;
