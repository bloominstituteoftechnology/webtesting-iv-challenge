const express = require('express');
const morgan = require('morgan');

const server = express();

server.use(morgan('combined')); //described by morgan as "Standard Apache combined log output."
server.use(express.json());

server.post('/anime', (req, res) => {
  res.json(req.body);
});

server.get('/anime', (req, res) => {
  res.json('here\'s all the anime I know about');
});

server.put('/anime', (req, res) => {
  res.json('you added a new anime');
});

server.delete('/anime', (req, res) => {
  res.json('you deleted an anime');
})

module.exports = server;
