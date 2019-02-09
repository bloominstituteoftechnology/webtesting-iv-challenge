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

server.post('/hobbits', async (req, res) => {
    const hobbitData = req.body;
    if (hobbitData.name){
        const ids = await hobbits.insert(hobbitData);
        res.status(201).json(ids);
    } else {
        res.status(400).json({error: "missing name in body"});
    }
})

module.exports = server;