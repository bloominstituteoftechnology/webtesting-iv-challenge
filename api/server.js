const express = require('express');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ message: 'server up' });
});

server.post('/api/:random', (req, res) => {
  const { random } = req.params;

  res.status(201).json({ abc: `${random}` });
});

server.delete('/api/:random', (req, res) => {
  const { random } = req.params;

  res.status(200).json({ message: 'Delete successful' });
});

module.exports = server;
