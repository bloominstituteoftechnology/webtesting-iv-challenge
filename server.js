const express = require('express');
const morgan = require('morgan');

const server = express();
server.use(morgan('combined'));
server.use(express.json());

const Record = require('./models');

server.post('/records', (req, res) => {
  const record = new Record(req.body);
  record.save()
    .then(res => {
      res.status(200).json(res);
      res.end();
    })
    .catch(err => res.status(500).json(err));
});

module.exports = server;