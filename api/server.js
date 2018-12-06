const express = require('express');
const server = express();

server.use(express.json());

// R O O T
server.get('/', (req, res) => {
  res.status(200).json({ message: 'we up' });
});

module.exports = server;
