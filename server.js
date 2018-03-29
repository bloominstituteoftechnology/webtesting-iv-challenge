const express = require('express');
const morgan = require('morgan');

const server = express();
server.use(morgan('combined'));
server.use(express.json());


server.get('/users', (req, res) => {
    res.json('Hello World');
});