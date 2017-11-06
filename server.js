const express = require('express');
const server = express();
const Player = require('./models/player');

const bodyParer = require('body-parser');
server.use(bodyParer.json());

module.exports = server;