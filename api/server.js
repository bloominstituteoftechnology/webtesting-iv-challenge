const express = require('express');

const musicians = require('../musicians/musiciansModel.js');

const server = express();

server.use(express.json());

server.get('/', async (req, res) => {
  res.status(200).json({ API: 'Working'});
});

server.get('/musicians', async (req, res) => {
  const rows = await musicians.getAll();

  res.status(200).json(rows);
});

server.post('/musicians', async (req, res) => {
  const musicianData = req.body;

  if (musicianData.name) {
    const ids = await musicians.insert(musicianData);
    res.status(201).json(ids);
  } else {
    res.status(400).json({ error: 'missing name' });
  }
});

server.delete('/musicians', async (req, res) => {
  
})

module.exports = server;