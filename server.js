const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const server = express();
const Band = require('./Model');

server.use(bodyParser.json());
server.use(morgan('dev'));

server

  // Create Band
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
  })

  // Read Bands
  .get('/api/bands', (req, res) => {
    Band.find({})
      .then(bands => {
        res.status(200).json(bands);
      })
      .catch(error => {
        res.status(500).json({ error: 'There was an error getting bands' });
      });
  })

  // Update Band
  .put('/api/bands/:id', (req, res) => {
    const { id } = req.params;
    const update = req.body;
    const { name, genre, numberOfMembers, yearFounded } = update;

    Band.findByIdAndUpdate(id, update)
      .then(band => {
        res.status(200).json(update);
      })
      .catch(err => {
        res
          .status(500)
          .json({ message: 'The band information could not be modified.' });
      });
  })

  // Delete Band
  .delete('/api/bands/:id', (req, res) => {
    Band.findByIdAndRemove(req.params.id)
      .then(band => {
        res.status(200).json({ message: 'The band was successfully deleted.' });
      })
      .catch(err => {
        res.status(500).json({ message: 'The band could not be deleted.' });
      });
  });

module.exports = server;
