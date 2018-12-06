const express = require('express');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ api: 'sanity check' })
});


const port = process.env.PORT || 9000;

module.exports = server;