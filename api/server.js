const knex = require('knex');
const express = require('express');

const server = express();
const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);
server.use(express.json());

const config = require('../knexfile.js').development;


server.get('/', (req, res) => {
  res.status(200).json({ api: 'up' });
});

server.post('/', (req, res) => {
  const { userName } = req.body;

  db('users')
    .insert(userName)
    .then(ids => {
      res.status(201).json(ids)
    })
    .catch(error => {
      res.status(500).json({ message: 'error adding user', error });
    });
});

server.delete('/:id', (req, res) => {
  const { id } = req.params;
  db = db.filter(user => {
    user._id !== Number(id)
  });
  res.status(200).json({ message: 'user has been deleted' });
});

module.exports = server;