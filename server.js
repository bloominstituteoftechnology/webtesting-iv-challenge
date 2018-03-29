const express = require('express');

const server = express();
server.use(express.json());

server.get('/band', (req, res) => {
   const { name } = req.body;
})

module.exports = server;