const express = require('express');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ message: 'server up' });
});

server.post('/Hello/:name', (req, res) => {
  const { name } = req.params;
  const lastName = req.body.lastName || 'Unknown';

  res.status(200).json({ hello: `${name} ${lastName}` });
});

module.exports = server;
