const express = require('express');
const server = express();

server.route('/')
  .get((req, res) => res.status(200).json({ message: 'En vivo!' }))

module.exports = server;
