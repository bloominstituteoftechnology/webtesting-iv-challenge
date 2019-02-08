const express = require('express');

const hobbits = require('../hobbits/hobbitsModel');
const server = express();

server.use(express.json());

server.get('/', async (req , res) => {
    res.status(200).json({ api: 'hobbit server up '});
})

server.get('/hobbits', async (req, res) => {
    const rows = await hobbits.getAll();
    res.status(200).json(rows);
});

module.exports = server;