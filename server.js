const express = require('express');
const bodyParser = require('body-parser');
const Animal = require('./animalmodel');

const server = express();
server.use(bodyParser.json());

server.get('/list-animal', (req, res) => {
  Animal.find({}, (err, animal) => {
    if(err) return res.send(err);
    res.send(animal);
  })
})

server.post('/create-animal', (req, res) => {
  const animal = new Animal(req.body);
  animal.save((err, newAnimal) => {
    if (err) return res.send(err);
    res.send(newAnimal);
  })
})

server.put('/change-region', (req, res) => {
  
})

server.delete('/remove-animal', (req, res) => {

})

module.exports = server;