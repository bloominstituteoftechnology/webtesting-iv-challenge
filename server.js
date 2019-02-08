const express = require('express');
const users = require('./users');
const server = express();

const PORT = process.env.PORT || 42;

server.use(express.json());

server.get('/', async (req, res) => {
    await
    res
        .status(200)
        .json({ API: 'working' });
})

module.exports = {
    server,
    PORT
}