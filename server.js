const express = require('express');
const mongoose = require('mongoose');
const server = express();
const cors = require('cors');
const helmet = require('helmet');

server.use(express.json());
server.use(helmet());
server.use(cors())

server.get('/', (req, res) => {
    res.status(200).json({api: 'running'});
});

module.exports = server;