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

server

  .put('/api/bands/:id', (req, res) => {
    const { name, genre, numberOfMembers, yearFounded } = req.body;
    Band.findByIdAndUpdate(req.params.id, req.body)
      .then(updatedBand => {
        res.status(201).json(updatedBand);
      })
      .catch(err => {
        res.status(500).json({
          errorMessage: 'The band information could not be modifed.'
        });
      });
  })

  .delete('/api/bands/:id', (req, res) => {
    const { id } = req.params;
    Band.findByIdAndRemove(id)
      .then(response => {
        if (response === null) {
          res.status(404).json({ message: 'not found' });
        } else {
          res.status(200).json({ message: 'Band was succesfully deleted.' });
        }
      })
      .catch(err => {
        if (err.name === 'CastError') {
          res.status(400).json({
            message: 'The id provided is invalid, please check and try again.'
          });
        } else {
          res
            .status(500)
            .json({ errorMessage: 'The Band could not be removed', err });
        }
      });
  });

module.exports = server;
