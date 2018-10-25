const express = require('express');

const { errorHandler } = require('./api/errorHandler/handlers');

const server = express();
server.use(express.json());

const state = [];

server.use((req, res, next) => {
	next(['h404', `The requested path '${req.path}' doesn't exist.`]);
});

server.use(errorHandler);

module.exports = server;
