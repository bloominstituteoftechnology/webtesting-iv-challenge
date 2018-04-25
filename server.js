const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const Movie = require('./movie');
const server = express();
server.use(bodyParser.json());
server.use(morgan('dev'));


server.get('/api/movies', (req, res) => {
  Movie.find({}, (err, movies) => {
    if (err) {
      res.status(500).json({ error: 'Cannot find your movies' });
    }
    res.json(movies);
  });
});

server.post((req, res) => {
  const movie = new Movie(req.body);

  movie
    .save()
    .then(savedMovie => {
      res.status(201).json(savedMovie);
    })
    .catch(err => res.status(500).json(err));
});

server.get('/id', (req, res) => {
    Movie.findById(req.params.id)
      .then(movies => {
        res.status(200).json(movies);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  })
  .delete((req, res) => {
    const { id } = req.params;
    Movie.findByIdAndRemove(id)
      .then(response => {
        if (response === null) {
          res.status(404).json({ message: 'not found' });
        } else {
          res.status(200).json(response);
        }
      })
      .catch(err => {
        if (err.name === 'CastError') {
          res.status(400).json({
            message: 'The id provided is invalid, please check and try again.',
          });
        } else {
          res
            .status(500)
            .json({ errorMessage: 'The movie could not be removed', err });
        }
      });
  })

module.exports = server;