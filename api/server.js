const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');

server.use(morgan('combined'));
server.use(express.json());

//===============================
//          ROUTES
//===============================

server.get('/', function(req, res) {
  res.status(200).json({ message: "Works..." });
});

module.exports = server;