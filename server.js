const express = require('express');

const server = express();

server.use(express.json());

const artists = require('./db');
const db = require('./models/Artist');

server.get('/', (req, res) => {
  res.json({ api: 'Working' });
});

server.get('/artists', async (req, res) => {
  const a = await db.getAll();
  res.status(200).json(a);
});

server.post('/artists', async (req, res) => {
  const artist = await db.insert(req.body);
  res.status(201).json(artist);
});

server.delete('/artists', async (req, res) => {
  // const deletedArtist = req.body;
  // const newArtists = [...artists];
  // const filteredArtists = newArtists.filter(
  //   artist => artist.name !== deletedArtist.name
  // );
  const artists = await db.remove(req.body);
  res.status(200).json(artists);
});

module.exports = server;
