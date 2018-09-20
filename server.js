const express = require('express');
const helmet = require('helmet');

const server = express(); 

server.use(helmet());
server.use(express.json());

server.post('/', (req, res) => {
  
  res.status(201).json({}); 
});

server.delete('/:id', (req,res) => {
  
  res.status(204).end(); 
});

module.exports = server; 

