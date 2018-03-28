const express = require('express');
const server = express();

server.use(express.json());

server.get('/api/toppings', (req, res) => {
  res.json(req.body);
});

module.exports = server;