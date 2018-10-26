const express = require('express');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ message: 'server is working!' });
});

server.post('/pets/:petsname', (req, res) => {
  const { petsname } = req.params;

  res.status(201).json({ petsname: `${petsname}`});
});

server.delete('/pets/:petsname', (req, res) => {
  const { petsname } = req.params;

  res.status(200).json({ confirmed: `${petsname} has been deleted` });
});

module.exports = server;