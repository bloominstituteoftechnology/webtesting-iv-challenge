const express = require('express');

const users =  require('../users/usersHelpers.js');

const server = express();

server.use(express.json());

module.exports = server;