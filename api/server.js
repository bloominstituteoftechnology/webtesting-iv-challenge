const express = require('express');

const configureMiddleware = require('../config/middleware.js');

const server = express();

configureMiddleware(server);

server.get('/', (req, res) => {
    res.status(200).json({ api: 'running' });
});

module.exports = server;