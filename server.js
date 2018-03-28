const express = require('express');
const morgan = require('morgan');

const server = express();

server.use(morgan('combined')); //described by morgan as "Standard Apache combined log output."
server.use(express.json());

module.exports = server;
