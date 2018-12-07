const express = require('express');

const server = express();

server.use(express.json());

const bandsILike = [];

server.post('/bands', (req, res) => {
  const { name, quality } = req.body;

  res.status(200).json({ wow: `${name} is a ${quality} band!` });
});

server.delete('/bands/:name', (req, res) => {
  const { name } = req.params;
  const foundBand = bands.find((band) => band.name == name);

  
});

module.exports = server;
