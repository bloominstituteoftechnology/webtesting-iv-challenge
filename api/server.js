const express = require('express');
const server = express();
const db = require('../data/dbConfig.js');

server.use(express.json());

// R O O T
server.get('/', (req, res) => {
  res.status(200).json({ message: 'we up' });
});

// P O S T
server.post('/albums', (req, res) => {
  const { name, title } = req.body;
  db('albums')
    .insert({ name, title })
    .then(() => {
      res.status(201).json({ message: 'successfully added' });
    })
    .catch(err => res.send(err));
});

// G E T   A L L
server.get('/albums', (req, res) => {
  db('albums')
    .then(album => res.status(200).json(album))
    .catch(err => res.status(500).json(err));
});

// G E T   B Y   I D
server.get('/albums/:id', (req, res) => {
  const { id } = req.params;

  db('albums')
    .where({ id: id })
    .first()
    .then(album => {
      if (album) {
        db('albums')
          .where({ id: id })
          .then(album => {
            res.status(200).json(album);
          })
          .catch(err => res.status(500).json(err));
      }
    });
});

// D E L E T E   B Y   I D
server.delete('/albums/:id', (req, res) => {
  const { id } = req.params;

  db('albums')
    .where({ id: id })
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => res.status(500).json(err));
});

module.exports = server;
