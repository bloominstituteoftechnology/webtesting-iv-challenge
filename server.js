const express = require('express');
const morgan = require('morgan');

const server = express();
server.use(morgan('Combined'));
server.use(express.json());


module.exports = server;