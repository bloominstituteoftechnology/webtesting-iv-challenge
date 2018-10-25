const express = require('express');
const helmet = require('helmet');

const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development)

const server = express();

server.use(helmet());
server.use(express.json());

// sanity check endpoint
server.get('/', (req, res) => {
    res.status(200).json({ message: 'server is up' });
})

server.get('/api/students', (req, res) => {
    db('students')
      .select('id','name')
      .then(students => {
        res.status(200).json(students);
      })
      .catch(err => res.status(500).json(err));
  });

  
  server.post('/api/students', (req, res) => {
    const student = req.body;
  
    db.insert(student)
      .into('students')
      .then(ids => {
        res.status(201).json(ids[0]);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });

  server.put('/api/students/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
  
    db('cohorts')
      .where({ id: id })
      .update(changes)
      .then(count => {
        if (!count || count < 1) {
          res.status(404).json({ message: 'No records found to update' });
        } else {
          res.status(200).json(count);
        }
      })
      .catch(err => res.status(500).json(err));
  });

  server.delete('/api/students/:id', (req, res) => {
    const { id } = req.params;
  
    db('students')
      .where({ id })
      .delete(id)
      .then(count => {
        if (!count || count < 1) {
          res.status(404).json({ message: 'No records found to delete' });
        } else {
          res.status(200).json(count);
        }
      })
      .catch(err => res.status(500).json(err));
  });

  module.exports = server;