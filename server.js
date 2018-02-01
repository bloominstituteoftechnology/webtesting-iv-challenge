const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const Movie = require('./movie');

const server = express();
server.use(bodyParser.json());
server.use(morgan('combined'));

server.get('/movies', (req, res) => {
  res.json({ text: 'Movies Collection' });
});

server.post('/movies', (req, res) => {
  const movie = new Movie(req.body);
  movie.save((err, newMovie) => {
    if (err) return res.send(err);
    res.send(newMovie);
  });
});

server.delete('/movies/:id', (req, res) => {
  Movie.findById(req.params.id).remove((err, removedMovie) => {
    if (err) return res.send(err);
    res.send(`success`);
  });
});

server.put('/movies', (req, res) => {
  Movie.findById(req.body.id, (err, movies) => {
    movies.title = req.body.title;
    movies.save((err, updatedMovie) => {
      if (err) return res.send(err);
      res.send(updatedMovie);
    });
  });
});

module.exports = server;
