const express = require('express');

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ api: 'running' });
  });

  
  server.get('/countries', (req, res) => {
    res.status(200).json({countries: "here are some countries"});
  });

  server.post('/countries', (req, res) => {
    const {country} = req.body;

      res.status(201).json({country});
  });

  server.delete('/countries/:country', (req, res) => {
      const { country } = req.params;

      res.status(200).json({message: `Success in deleting ${country}`});
  })
  
  module.exports = server;