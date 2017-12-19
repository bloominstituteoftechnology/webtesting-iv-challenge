const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
// import in models

const server = express();
server.use(bodyParser.json());
server.use(morgan('combined'));

server.get('/movies', (req, res) => {
  res.json({ text: 'Movies Collection' });
});

// server.get('/monsters', (req, res) => {
//   res.json(['Mike Wazowski, Sully']);
// });

module.exports = server;