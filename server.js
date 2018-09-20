const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const server = express();

server.use(express.json());
server.use(helmet());

const dbConfig = require('./knexfile');
const db = knex(dbConfig.development);


server.get('/', (req, res) => {
  res.status(200).json({api: 'running'})
});



server.get('/users', (req, res) => {
  db('users').select()
  .then(users => {
    res.status(200).json(users)
  })
  .catch(err => {
    res.status(500).json(err)
  })
});


server.post('/users', (req, res) => {
  db('users').insert(req.body)
  .then(newId => {
    res.status(200).json(newId)
  })
  .catch(err => {
    res.status(500).json(err)
  })
});


server.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  db('users').where({id}).del()
  .then(count => {
    res.status(200).json(count)
  })
  .catch(err => {
    res.status(500).json(err)
  })
});


module.exports = server;
