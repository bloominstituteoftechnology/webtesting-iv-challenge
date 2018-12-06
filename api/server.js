
const express = require('express');

const server = express();

const db = require('../data/dbConfig.js');

server.use(express.json())

server.get('/', (req, res) =>{
  res.status(200).json({ api: "up" })
});
server.get('/api/users', (req, res) =>{
  db('users')
    .select('id', 'username')
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));  
});
server.post("/api/users", (req, res) => {
  const { user } = req.body;
  res.status(201).json(user);
});
server.delete("/api/remove", (req, res) => {
  const { user } = req.body;
  res.status(200).json(true);
});

module.exports = server;