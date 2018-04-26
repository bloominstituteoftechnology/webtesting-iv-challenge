const express = require('express');
const morgan = require('morgan');
const Band = require('./band.js')

const server = express();

server.use(express.json());
server.use(morgan('dev'));

server.get('/api/bands', (req, res) => {
    Band
    .find()
    .then(ans => {
        res.status(200).json(ans);
    })
    .catch(err => {
        res.status(500).json(err);
    })
});

server.post('/api/bands/', (req, res) => {
    const newBand = new Band(req.body);

    newBand
    .save()
    .then(ans => {
        res.status(200).json(ans);
    })
    .catch(err => {
        res.status(500).json(err);
    });

});

server.put('/api/bands/:id', (req, res) =>{
    const update = req.body;
    Band
    .findByIdAndUpdate(req.params.id, update)
    .then(ans => {
        res.status(200).json(ans);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

server.delete('/api/bands/:id', (req, res) => {
    Band
    .findByIdAndRemove(req.params.id)
    .then(ans => {
        res.status(200).json(ans);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

module.exports = server;