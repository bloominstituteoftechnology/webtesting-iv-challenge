const mongoose = require('mongoose');
const express = require('express');

const server = express();

server.get('/', (req, res) => {
    res.status(200).json({ api: 'running' })
})

// server.post('/post', (req, res) => {

// })

const port = 4000;

if (process.env.NODE_ENV !== 'test') {
    server.listen(port, () => console.log(`Connected on port: ${port}`))
}

module.exports = server;