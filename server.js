const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const Artist = require('./artist');
const server = express();
server.use(bodyParser.json());
server.use(morgan('dev'));

server.get('/api/artists', (req, res) => {
    Artist.find({}, (err, artists) => {
        if (err) {
            res.status(500).json({ error: 'Can not find artists'})
        }
        res.json(artists);
    })
});

module.exports = server;