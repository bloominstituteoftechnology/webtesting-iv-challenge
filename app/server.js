const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const VideoGame = require('./models')

const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;
const server = express();

server.use(bodyParser.json());

server.post('/games', (req, res) => {
  const { title, developer, yearReleased } = req.body;
  if (!title || !developer || !yearReleased) {
    res.status(STATUS_USER_ERROR).json({ error: 'you must provide a title, developer, and yearReleased' });
    return;
  }
  const game = new VideoGame({ title, developer, yearReleased });
  game.save()
  .then((game) => {
    res.send(game);
  })
  .catch((error) => {
    res.status(STATUS_SERVER_ERROR).json(error);
  })
});

server.get('/games', (req, res) => {
  VideoGame.find({})
  .exec()
  .then((games) => {
    res.json(games);
  })
  .catch((error) => {
    res.status(STATUS_SERVER_ERROR).json(error);    
  })
});

server.get('/games/:id', (req, res) => {
  const { id } = req.params;  
  VideoGame.findById(id)
  .exec()
  .then((game) => {
    res.json(game);
  })
  .catch((error) => {
    res.status(STATUS_SERVER_ERROR).json(error);    
  })
});

server.put('/games/:id', (req, res) => {
  const { title, developer, yearReleased } = req.body;
  const { id } = req.params;
  VideoGame.findByIdAndUpdate(id, {$set: {title, developer, yearReleased}}, {new:true})
  .exec()
  .then((game) => {
    res.json(game);
  })
  .catch((error) => {
    res.status(STATUS_SERVER_ERROR).json(error);    
  })
});

server.delete('/games/:id', (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(STATUS_USER_ERROR).json({ error: 'you must provide a id' });
    return;
  }
  VideoGame.findByIdAndRemove(id)
  .exec()
  .then((game) => {
    res.json(game);
  })
  .catch((error) => {
    res.status(STATUS_SERVER_ERROR).json(error);    
  })
});

module.exports = server;