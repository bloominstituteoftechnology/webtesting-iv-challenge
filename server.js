const express = require('express');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    if (res) {
    res.status(200).json({ path: 'exists' });
    } else {
        res.status(400).json({ path: "doesn't exist"})
    }
})

server.post('/species', (req, res) => {
    const { animal } = req.body;

    res.status(200).json({ species: `${animal}`});
})

module.exports = server