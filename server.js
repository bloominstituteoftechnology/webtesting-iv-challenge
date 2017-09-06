const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const Animals = require('./Animals');

const server = express();

server.use(bodyParser.json());

const STATUS_USER_ERROR = 422;

const sendUserError = (err, res) => {
  res.status(STATUS_USER_ERROR);
  if (err && err.message) {
    res.json({ message: err.message, stack: err.stack });
  } else {
    res.json({ error: err });
  }
};

server.get('/animals', (req, res) => {
  Animals.find({}, (err, animals) => {
    if (err) {
      sendUserError(err, res);
      return;
    }
    res.json(animals);
  });
});

server.post('/animals', (req, res) => {
  const { name, continent } = req.body;
  if (!name) {
    sendUserError('Must include a name', res);
    return;
  } 
  if (!continent) {
    sendUserError('Must include a continent', res);
    return;
  }
  const newAnimal = new Animals({ name, continent });
  newAnimal.save((err, newAnimal) => {
    if (err) {
      sendUserError(err, res);
      return;
    }
    res.json(newAnimal);
  });
});

server.put('/animals/:name', (req, res) => {
  const name = req.params.name;
  // console.log(name);
  const newContinent = req.body.continent;
  if (!name) {
    sendUserError('Must include a name', res);
    return;
  } 
  if (!newContinent) {
    sendUserError('Must include a continent', res);
    return;
  }
  Animals.find({ name }, (err, animal) => {
    if (err) {
      sendUserError(err, res);
      return;
    }
    animal[0].continent = newContinent;
    res.json(animal[0]);
  });
});


module.exports = server;