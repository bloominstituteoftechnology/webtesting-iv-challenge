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


module.exports = server;
