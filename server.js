const express = require('express');

const server = express();

server.use(express.json());

const artists = [
  {
    name: 'The Sidekicks'
  },
  {
    name: 'Radiohead'
  },
  {
    name: 'PUP'
  },
  {
    name: 'Tom Petty and the Heartbreakers'
  },
  {
    name: 'Vulfpeck'
  }
];

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

module.exports = server;
