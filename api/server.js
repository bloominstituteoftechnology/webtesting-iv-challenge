const express = require('express');

const avengers = require('../avengers/avengersModel.js');

const server = express();

server.use(express.json());

server.get('/', async (req, res) => {
  res.status(200).json({ api: 'up' });
});

server.get('/avengers', async (req, res) => {
  const rows = await avengers.getAll();

  res.status(200).json(rows);
});

module.exports = server;
