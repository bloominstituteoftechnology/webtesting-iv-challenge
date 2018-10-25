const express = require('express');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.json({message: 'Server check'});
});

server.post('', (req, res) => {
 


  
})

module.exports = server;