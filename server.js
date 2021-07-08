const express = require('express');

const server = express();

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

server.post('/cars', (req, res) => {
    let { make, model } = req.body;
  
    return res.status(201).json({ make, model });
  });
  
  server.delete('/cars/:id', (req, res) => {
    let id = req.params.id;
  
    return res.status(201).json({message: `Car with ID: ${id} has been removed`});
  });

module.exports = server;