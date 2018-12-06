const express = require('express');

const server = express();

server.use(express.json());

//BASIC ROUTE ENDPOINT..
server.get('/', (req, res) => {
       res.status(200).json({Message:  'SERVER  RUNNING.'});
})

module.exports = server;