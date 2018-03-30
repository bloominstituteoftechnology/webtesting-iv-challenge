const express = require('express');
const morgan = requre('morgan');
const mongoose = require('mongoose');
const Movie = require('./schema');

const server = express();
server.use(morgan('combined'));
server.use(express.json());

mongoose
  .connect('mongodb://localhost/test')
  .then(() => console.log('Sucessfully connected to MongoDB'))
  .catch(err => console.log('Error connnecting to MongoDB'));

server.get('/movies', (req, res) => {
  Movie.find({})
    .then(movies => {
      res.status(200).send(movies);
    })
    .catch(err => {
      res.status(500).send(err);
    })
});

server.post('/movies', (req, res) => {
  const newMovie = req.body;
  const movie = new Movie(newMovie);
  movie
    .save().then(weapon => res.status(200).json(movie))
    .catch(err =>
      res.status(500).json({ msg: 'Error saving Movie', err }))
});

server.put('/movies:name', (req, res) => {
  const { name } = req.params;
  const movie = req.body;
  Movie.findOneAndUpdate({ name }, movie, { new: true })
    .then(newMovie => {
      res.status(200).json(newMovie);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.delete('/movies:name', (req, res) => {
  const { name } = req.params;
  Movie.findOneAndRemove({ name })
    .then(movie => {
      res.status(200).json(movie);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});
module.exports = server;