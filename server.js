const express = require('express');
//const bodyparser = require('body-parser');
const morgan = require('morgan');
const server = express();
const Battlefield = require('./battlefield');

server.use(express.json());
server.use(morgan('dev'));

server.get('/api/battlefield', (req, res) => {
  Battlefield.find({}, (error, response) => {
    if (error) {
      return res.status(404).json(error);
    }
    res.send(response);
  });
});

server.put('/api/battlefield', (req, res) => {
  const updatedBattlefield = {
    name: req.body.name,
    kills: req.body.kills,
    deaths: req.body.deaths
  };
  Battlefield.findByIdAndUpdate(req.body.id, updatedBattlefield, (error, battlefield) => {
    if (error) return res.status(400).json(error);
    res.status(200).send(updatedBattlefield);
  });
});

server.post('/api/battlefield', (req, res) => {
  const battlefield = new Battlefield(req.body);

  battlefield
    .save()
    .then(newUser => {
      res.status(200).json(newUser);
    })
    .catch(error => res.status(500).json({ error: 'error in post' }));
});

server.delete('/api/battlefield/:id', (req, res) => {
  Battlefield.findByIdAndRemove(req.params.id, error => {
    if (error) return res.status(400).json(error);
    res.status(200).json({ message: 'Suceessfully deleted the User' });
  });
});

module.exports = server;
