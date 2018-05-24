const express = require('express');

const server = express();

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

if (process.env.NODE_ENV !== 'test') {
  server.listen(5000);
}

module.exports = server;