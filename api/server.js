const express = require('express');

const bicycles = require('../bicycles/bicyclesModel.js');

const server = express();

server.use(express.json());

server.get('/', async (req, res) => {
  res.status(200).json({ api: '^^ up ^^' });
});

server.get('/bicycles', async (req, res) => {
  const rows = await bicycles.getAll();

  res.status(200).json(rows);
});

module.exports = server;
