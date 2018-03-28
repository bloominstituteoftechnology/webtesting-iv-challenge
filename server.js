const express = require('express');
// const morgan = require('morgan');

const server = express();
// Didn't say to import this, not sure if we should use or not
// server.use(morgan('combined'));
server.use(express.json());

server.post('/band', (req, res) => {
  res.status(200).send(req.body);
});

server.get('/bands', (req,res) => {
    res.status(200).send(req.body);
})

server.put('/band/:name', (req,res) => {
  res.status(200).send(req.body);
})

module.exports = server;
