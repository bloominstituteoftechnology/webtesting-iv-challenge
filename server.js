const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
// import in models
const server = express();
server.use(bodyParser.json());
server.use(morgan('combined'));

server.get('/food', (req, res) => {
  res.json({ text: 'hello world' });
});

server.get('/monsters', (req, res) => {
  res.json(['Mike Wazowski, Sully']);
});

module.exports = server;
