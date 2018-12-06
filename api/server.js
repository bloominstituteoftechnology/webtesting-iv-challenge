const express = require('express');

const server = express();

server.use(express.json());

// sanity check endpoint
server.get('/', (req, res) => {
  res.status(200).json({ api: 'up' });
});

server.post('/greet', (req, res) => {
  const { name } = req.body;
  localStorage.setItem('name', name);
  res.status(200).json({ hello: localStorage.getItem('name') });
  // res.status(200).json({ hello: 'Ryan Clausen' });
});

const port = process.env.PORT || 9000;

module.exports = server;
