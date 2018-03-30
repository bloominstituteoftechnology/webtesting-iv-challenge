const express =require('express');
const morgan = require('morgan');

const server = express();
server.use(morgan('combined'));
server.use(express.json());

server.post('/band', (req,res) => {
    res.send(req.body);
});

server.get('/bands', (req,res) => {
    res.send('Hello World');
});

module.exports = server;