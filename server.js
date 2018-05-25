const express = require('express');
const mongoose = require('mongoose');
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ API: 'Running!' })
});

if(process.env.NODE_ENV !== 'test') {
  server.listen(9000);
}

module.exports = server;