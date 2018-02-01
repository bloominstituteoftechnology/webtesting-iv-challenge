const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const server = express();
const router = express.Router();
server.use(morgan('combined'));
server.use(bodyParser.json());
server.use(router);

server.get('/', (req,res) => {
  res.send('Connected to server!');
});

module.exports = server;