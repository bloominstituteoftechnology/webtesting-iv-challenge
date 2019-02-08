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

server.delete('/character', async(req, res) => {
    const character = req.body;

    if(character.name) {
        const deleted = await characterDB.remove(character);

        if(deleted > 0) {
            res.status(200).json(deleted);
        } else {
            res.status(404).json({ message: 'Character doesn\'t exist' });
        }

    } else {
        res.status(400).json({message: 'Especify which character is going to be deleted'});
    }
});

module.exports = server;