const express = require('express');
const server = express();
server.use(express.json());

server.post('/resources', (req, res) => {
  res.status(201).json({ message: 'Resource added.' });
});

server.delete('/resources/:id', (req, res) => {
  const { id } = req.params;
  res.status(200).json({ message: `Resource with id ${id} deleted.` });
});

module.exports = server;
