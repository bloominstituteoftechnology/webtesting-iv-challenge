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

module.exports = server;