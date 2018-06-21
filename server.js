const server = require('express')();

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

module.exports = server;