const express = require('express');
const morgan = require('morgan');
const Band = require('./Band');
const server = express();
server.use(express.json());
server.use(morgan('dev'));

// Routes
server.get('/', (req, res) => {
    res.send('Hello, I am a working route')
})

module.exports = server;
