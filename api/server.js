const express = require('express');

const cats = require('../helper/cathelper.js');

const server = express();

server.use(express.json());

server.get('/', async (req, res) => {
  res.status(200).json({ api: 'up' });
});

server.get('/cats', async (req, res) => {
  const rows = await cats.getAll();

  res.status(200).json(rows);
});

server.post('/cats', async (req, res) => {
  const catData = req.body;

  if (catData.name) {
    const ids = await cats.insert(catData);
    res.status(201).json(ids);
  } else {
    res.status(400).json({error: 'missing name in body'})
  }

})
module.exports = server;
