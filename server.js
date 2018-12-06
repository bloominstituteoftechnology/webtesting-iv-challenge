// Imports
const express = require('express');

// Initializes the server
const server = express();

// Middleware
server.use(express.json());

const users = [{ name: 'Brandon' }];

// Endpoints
// Get / Endpoint
server.get('/', (req, res) => {
  res.status(200).json({ message: 'API running' });
});

// Get users
server.get('/api/users', (req, res) => {
  res.status(200).json(users);
});

// Add user
server.post('/api/users', (req, res) => {
  const { name } = req.body;

  const user = {
    name: name
  };

  users.push(user);

  res.status(201).send(users);
});

server.delete('/api/users/:name', (req, res) => {
  const name = req.params.name;
  console.log(name);
  const result = users.filter(user => {
    return user.name !== name;
  });

  res.send(result);
});

module.exports = server;
