const express = require('express');
const morgan = require('morgan');

const server = express();
server.use(morgan('combined'));
server.use(express.json());

const Record = require('./models');

server.post('/records', (req, res) => {
  console.log(req.body);
  const record = new Record(req.body);
  record
    .save()
    .then((res) => {
      console.log(res);
      res.status(200).json(res);
      res.end();
    })
    .catch((err) => res.status(500).json(err));
});

server.get('/records', (req, res) => {
  Record.find({})
    .then((records) => {
      console.log(records)
      res.status(200).json(records);
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = server;
