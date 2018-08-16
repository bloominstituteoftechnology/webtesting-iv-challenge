const express = require('express');

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ api: 'running' });
  });


  server.post('/countries', (req, res) => {
    const {country} = req.body;

      res.status(201).json({country});
  })
  
  module.exports = server;