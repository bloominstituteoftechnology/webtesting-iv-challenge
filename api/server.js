const express = require('express');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ message: 'server is operational, keep working!' });
});

server.post('/players/:character', (req, res) => {
  const { character } = req.params;

  res.status(200).json({ hello: `${character}` });
});

module.exports = server;