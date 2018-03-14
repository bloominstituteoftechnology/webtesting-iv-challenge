const express = require('express');
const morgan = require('morgan');

const server = express();
server.use(morgan('combined'));
server.use(express.json());

//server.get

//server.post

//server.put

//server.delete

module.exports = server;