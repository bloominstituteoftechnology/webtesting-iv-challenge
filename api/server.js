const express = require('express');

const server = express();
let notes = [];

server.use(express.json());

server.get('/', async (req, res) => {
    res.status(200).json({api: 'up'});
});

server.get('/api/notes', async (req, res) => {
    res.status(200).json({notes});
});

server.post('/api/notes', async (req, res) => {
    const body = req.body;
    if (body.author && body.text) {
        notes.push(body);
        res.status(201).json(notes.length-1);
        console.log(notes);
    }
    else {
        res.status(400).json({errorMessage: 'Posts require both an author and text.'})
    }
});

server.put('/api/notes/:id', async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    if (body.author && body.text) {
        notes[id] = body;
        res.status(200).json(notes);
    }
    else {
        res.status(400).json({errorMessage: 'Puts require both an author and text'})
    }
});

server.delete('/api/notes/:id', async (req, res) => {
    const { id } = req.params;
    if (id < 0 || id > notes.length) {
        res.status(404).json({errorMessage: 'ID not found.'})
    }
    else {
        notes.slice(id, 1);
        res.status(200).json(notes);
    }
});

module.exports = server;