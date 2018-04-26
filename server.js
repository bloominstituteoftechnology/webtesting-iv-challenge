const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const metasRouter = require('./metas/metasRouter.js');
const decksRouter = require('./decks/decksRouter.js');
const pilotsRouter = require('./pilots/pilotsRouter.js');

const server = express();

server.use(bodyParser.json());
server.use(morgan('dev'));

server.use('/api/metas', metasRouter);
server.use('/api/decks', decksRouter);
server.use('/api/pilots', pilotsRouter);

module.exports = server;
