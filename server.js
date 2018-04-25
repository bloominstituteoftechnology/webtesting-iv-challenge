const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const server = express();
server.use(bodyParser.json());
server.use(morgan('dev'));

server.get('/api/bands', (req, res) => {
    res.status(200).json({ api: "I'm server rick!!" });
});

module.exports = server;