const express = require('express');
const mongoose = require('mongoose');

const server = express();

server.get('/', (req, res) => {
    res.status(200).json({ api: '=== api running ==='});
});

if (process.env.NODE_ENV !== 'test') {
    server.listen(5005);
}

module.exports = server;