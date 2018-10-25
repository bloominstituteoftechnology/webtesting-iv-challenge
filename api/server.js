const express = require('express');

const server = express();

server.use(express.json())

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

server.post('/monkey/:name', (req, res) => {
  const { name } = req.params;
  const lastName = req.body.lastName || 'Doe';

  res.status(200).json({ hello: `${name} ${lastName}` });
});

server.delete('/monkey/:name', (req, res) => {
  const { name } = req.params;
  const lastName = req.body.lastName || 'Doe';

  res.status(200).json({ hello: `${name} ${lastName}` });
});

module.exports = server;
