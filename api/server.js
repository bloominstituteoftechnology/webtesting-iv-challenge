
const express = require('express');

const server = express();

const db = require('../data/dbConfig.js');

server.use(express.json())

server.get('/', (req, res) =>{
  res.status(200).json({ api: "up" })
});
server.get('/api/users', (req, res) =>{
  db('users')
    .select('id', 'name')
    .then(users => {
      response.status(200).json(users);
    })
    .catch(err => res.send(err));  
});
server.post("/api/users", (req, res) => {
  const name= req.body;
  db('users')
  .insert(name)
  .then(id => {
    res.json(id);
  })
  .catch(err => res.send(err));
});
server.delete("/api/users/:userId", (req, res) => {
  const { userId } = req.params;

  db('users')
  .where({ id: userId })
  .then(count => {
    res.status(200).json(count);
  })
  .catch(err => res.status(500).json(err));
});

module.exports = server;