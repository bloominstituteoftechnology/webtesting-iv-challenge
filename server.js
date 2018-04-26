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

server.post('/api/movies', (req, res) => {
  const { title, genre } = req.body;
  const newMovie = new Band({ title, genre });
  newMovie
    .save()
    .then(savedMovie => {
      Movie.find({}, (err, allMovies) => {
        // handle that error!
        res.json(allMovies);
      });
    })
    .catch(errr => {
      res.status(422).json(errr);
    });
});

module.exports = server;