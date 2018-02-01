const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes');


const server = express();
server.use(morgan('combined'));
server.use(bodyParser.json());
server.use(routes)


module.exports = server;