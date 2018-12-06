const express = require('express');
const db = require('../data/dbConfig.js');
const server = express();

server.use(express.json());

//sanity check endpoint

server.get('/', (req, res) => {
  res.status(200).json({ api: 'up' });
});

server.post('/characters', (req, res) => {
  const { name } = req.body;
  db('characters')
    .insert({ name })
    .then(() => {
      res.status(201).json({ message: 'character added' });
    });
});

server.delete('/characters/:id', (req, res) => {
  const { id } = req.params;
  db('characters')
    .where({ id: id })
    .del()
    .then(() => {
      res.status(200).json({ message: 'character deleted' });
    });
});

module.exports = server;
