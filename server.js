const express = require('express');

const server = express();

server.use(express.json());

const artists = require('./db');

server.get('/', (req, res) => {
  res.json({ api: 'Working' });
});

server.get('/artists', (req, res) => {
  res.status(200).json(artists);
});

server.post('/artists', (req, res) => {
  artists.push(req.body);
  res.status(201).json(artists);
});

server.delete('/artists', (req, res) => {
  const deletedArtist = req.body;
  const newArtists = [...artists];
  const filteredArtists = newArtists.filter(
    artist => artist.name !== deletedArtist.name
  );
  res.status(200).json(filteredArtists);
});

module.exports = server;
