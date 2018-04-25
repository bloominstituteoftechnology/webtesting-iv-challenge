const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const Band = require('./Model');
const server = express();
server.use(bodyParser.json());
server.use(morgan('dev'));

server

  .get('/api/bands', (req, res) => {
    Band.find({}, (err, bands) => {
      if (err) {
        res.status(500).json({ error: 'Cannot find your bands' });
      }
      res.json(bands);
    });
  })

  .post('/api/bands', (req, res) => {
    const band = new Band(req.body);
    const { name, genre, numberOfMembers, yearFounded } = req.body;
    band
      .save()
      .then(savedBand => {
        res.status(201).json({ savedBand });
      })
      .catch(error => {
        res.status(500).json({ error: 'There was an error creating band' });
      });
  });

module.exports = server;
