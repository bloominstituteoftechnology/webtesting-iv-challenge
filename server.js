const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const Band = require('./model');

const server = express();
server.use(bodyParser.json());
server.use(morgan('dev'));

server.get('/api/bands', (req, res) => {
  Band.find({})
    .then(bands => {
      res.status(200).json(bands);
    })
    .catch(err => {
      res.status(500).json({ error: 'Cannot get a list of all bands' });
    });
});

server.post('/api/bands', (req, res) => {
  const { bandName, bandGenre } = req.body;
  const newBand = new Band({ bandName, bandGenre });
  newBand
    .save()
    .then(savedBand => {
      Band.find({}, (err, allbands) => {
        if (err) console.log(err);
        res.json(allbands);
      });
    })
    .catch(err => {
      res.status(422).json(err);
    });
});

server.put('/api/bands/:id', (req, res) => {
  Band.findByIdAndUpdate(req.params.id, {
    $set: {
      bandName: req.body.bandName,
      bandGenre: req.body.bandGenre
    }
  })
    .then(updateBand => {
      res.status(200).json(updateBand);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.delete('/api/bands/:id', (req, res) => {
  Band.findByIdAndRemove(req.params.id).then(response => {
    res.status(200).json(response);
  });
});

module.exports = server;
