const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./routes');

const server = express();

server.use(bodyParser.json());
server.use(morgan('dev'));
server.use('/api/woofs', router);

module.exports = server;