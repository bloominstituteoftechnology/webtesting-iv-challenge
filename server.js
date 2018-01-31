const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');


const server = express();
server.use(morgan('combined'));
server.use(bodyParser.json());

module.exports = server;