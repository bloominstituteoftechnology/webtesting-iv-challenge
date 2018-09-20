const express = require('express');

const server = express();

server.use(express.json());

server.get('/', (req,res)=> {
    res.status(200).end();
});

module.exports = server;