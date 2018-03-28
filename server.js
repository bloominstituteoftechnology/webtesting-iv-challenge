const express = require('express');
const morgan = requre('morgan');

const server = express();
server.use(morgan('combined'));
server.use(express.json());


module.exports = server;