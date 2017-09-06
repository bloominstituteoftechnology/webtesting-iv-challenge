const express = require('express');
const bodyParser = require('body-parser');
const Team = require('./TeamModel');

const server = express();
server.use(bodyParser.json());

module.exports = server;
