const express = require('express');
const knex = require('knex');

const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);
const server = express();

server.use(express.json());

// sanity check endpoint
server.get('/', (req, res) => {
  res.status(200).json({ api: 'up' });
});

server.post('/', (req, res) => {
  const name = req.body;

  db('names')
    .insert(name)
    .returning('id')
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error inserting name', err });
    })
});

server.delete('/:id', (req, res) => {
  const { id } = req.params;

  db('names')
    .where({ id: id })
    .del()
    .then(count => {
      res.status(200).json({ count })
    })
    .catch(err => res.status(500).json(err));
})

module.exports = server;
