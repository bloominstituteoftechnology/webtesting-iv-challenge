const express = require('express');

const characterDB = require('../data/helpers/characterDb');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ hero: 'The Gunslinger' });
});

server.post('/character', async(req, res) => {
    const character = req.body;

    if(character.name) {
        const posted = await characterDB.add(character);

        res.status(201).json(posted);
    } else {
        res.status(400).json({ message: 'New character needs a name' })
    }
});

module.exports = server;