const express = require('express');
const bodyParser = require('body-parser');
const Animal = require('./animalmodel');

const server = express();
server.use(bodyParser.json());

server.get('/list-animal', (req, res) => {
  Animal.find({}, (err, animal) => {
    if(err) return res.send(err);
    res.send(animal);
  });
});

server.post('/create-animal', (req, res) => {
  const animal = new Animal(req.body);
  animal.save((err, newAnimal) => {
    if (err) return res.send(err);
    res.send(newAnimal);
  });
});

server.put('/change-region', (req, res) => {
  const name = req.body.name;
  Animal.findOne({ name }, (err, newAnimal) => {
    if (err) return res.send(err);
    newAnimal.region = req.body.region;
    newAnimal.save((err, animal) => {
    if (err) return res.send(err);
    res.send(animal);
    });
  });
});

server.delete('/remove-animal/:name', (req, res) => {
  const name = req.params.name;
  console.log(name);
  Animal.findOne({ name }, (err, newAnimal) => {
    if (err) return res.send(err);
    newAnimal.remove((err, animal) => {
    if (err) return res.send(err);
    res.send(animal);
    });
  });
});

module.exports = server;