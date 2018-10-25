const express = require('express');
const knex = require('knex');
const knexConfig = require('./knexfile.js').development;

// server setup

const server = express();
const db = knex(knexConfig);
server.use(express.json());

// server functions

// simple GET request to test server

server.get('/api', (req, res) => {
  res.send('Server functioning properly!');
});

// get list of users

server.get('/api/users', (req, res) => {

  db('users')
    .then(users => res.status(200).json({ message: 'Here are the requested users.', users }))
    .catch(err => res.status(500).json(err.message));
})

// post a user to the database

server.post('/api/users', (req, res) => {
  const { username, age, department } = req.body;
  const user = { username, age, department };

  db.insert(user)
    .into('users')
    .then(added => {
      res.status(201).json({ message: 'User successfully added to database.', added })
    })
    .catch(err => {
      console.log(err.message);
      res.status(500).json(err);
    });
});

// update a user

server.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const { username, age, department } = req.body;
  const user = { username, age, department };

  db('users')
    .where({ id })
    .first()
    .update(user)
    .then(updated => res.status(200).json({ message: 'User updated successfully.'})
    )
    .catch(err => res.status(500).json(err.message));
});

// delete a user

server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;

  db('users')
  .where({ id })
  .first()
  .del()
  .then(deleted => res.status(200).json({ message: 'User deleted successfully.' })
  )
  .catch(err => res.status(500).json(err.message));
});

// server instantiation

const port = 8000;

server.listen(port, () => console.log('Server listening on port 8000.'));

module.exports = server;
