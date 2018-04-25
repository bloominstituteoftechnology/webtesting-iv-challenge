const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
// const bandsRouter = require('./bandsRouter.js');
const Band = require('./Band.js');

const server = express();
server.use(express.json());
server.use(morgan('dev'));

// ROUTES WILL BE BUILT HERE
// server.use('/bands', bandsRouter);

server.get('/', (req, res) => {
  res.status(200).json('API Running, GET /');
});

server.get('/bands', (req, res) => {
  Band.find({})
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).json({ error: 'Error getting' });
    });
});

server.post('/bands', (req, res) => {
  const newBand = new Band(req.body);
  newBand
    .save()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).json({ error: 'Could not POST new band.' });
    });
});

server.put('/bands/:id', (req, res) => {
  Band.findByIdAndUpdate(req.params.id, req.body)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).json({ error: 'Error PUTting.' });
    });
});
server.delete('/bands/:id', (req, res) => {
  Band.findByIdAndRemove(req.params.id, req.body)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(200).json({ error: 'Error Deleting' });
    });
});

module.exports = server;
