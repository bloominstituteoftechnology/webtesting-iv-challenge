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

server.delete('/musicians/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const ids = await musicians.remove(id);
    if ( ids < 1 ) {
      res.status(404).json({ error: 'Musician not available' })
    } else {
      res.status(200).json(ids);
    }
  } catch (err) {
    res.status(500).json({ error: 'Database go boom' });
  }
})

module.exports = server;