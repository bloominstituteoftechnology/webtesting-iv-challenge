const express = require('express');
const morgan = require('morgan');
const Anime = require('./model');

const server = express();

server.use(morgan('combined')); //described by morgan as "Standard Apache combined log output."
server.use(express.json());

server.get('/anime', (req, res) => {
  Anime.find({}, (err, anime) => {
    if (err) return res.status(400).json(err.message);
    res.send(anime);
  });
});

server.post('/anime', (req, res) => {
  const anime = new Anime(req.body);
  anime.save((err, newAnime) => {
    if (err) return res.status(400).json(err.message);
    res.send(newAnime);
  });
});

server.put('/anime', (req, res) => {
  const updatedAnime = {
    name: req.body.name,
    genre: req.body.genre,
  }
  Anime.findByIdAndUpdate(req.body.id, updatedAnime, (err, anime) => {
    if (err) return res.status(400).json(err.message);
    res.send(updatedAnime);
  });
});

server.delete('/anime/:id', (req, res) => {
  Anime.findByIdAndRemove(req.params.id, (err) => {
    if (err) return res.status(400).json(err.message);
    res.send('successfully deleted');
  });
});

module.exports = server;
