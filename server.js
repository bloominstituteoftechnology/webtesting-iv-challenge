const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Band = require('./band');

const server = express();
server.use(morgan('dev'));
server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json('api: Running...');
});

server.get('/api/bands', (req, res) => {
  Band.find({})
    .then(bands => res.status(200).json(bands))
    .catch(err => res.status(500).json({ error: 'Cannot fetch bands' }));
});

server.post('/api/bands', (req, res) => {
  const band = new Band(req.body);
  band
    .save()
    .then(band => res.status(201).json(band))
    .catch(err => res.status(500).json({ error: 'Cannot create band' }));
});

// server.get('/api/bands/:id', (req, res) => {
//   const id = new id(req.params);
//   Band.findById()
//     .then(response => {
//       res.status(200).json(response);
//     })
//     .catch(err => res.status(500).json({ error: 'Cannot fetch band' }));
// });

module.exports = server;
