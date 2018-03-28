const express = require('express');

const server = express();
server.use(express.json());

const Band = require('/models');

server.get('/bands', (req, res) => {
  Band.find().then((bands) => res.status(200).json(bands));
});

server.post('/band', (req, res) => {
  const newBand = new Band(req.body);

  newBand
    .save()
    .then(savedBand => {
      res.status(201).json(savedBand);
    })
    .catch(error => {
      res.status(500).json(error);
    })
});

server.put('/band/:id', (req, res) => {
  const { id } = req.params;
  const updatedBand = req.body;

  Band.findByIdAndUpdate(id, updatedBand)
    .then(band => {
      if (band) res.status(200).json(band);
      else res.status(404).json("Band ID Not Found")
    })
    .catch(error => {
      res.status(500).json("Error Updating Band")
    })
});

server.delete('/band/:id', (req, res) => {
  const { id } = req.params;

  Band.findByIdAndRemove(id)
    .then(removedBand => {
      if (removedBand) res.status(200).json(removedBand)
      else res.status(404).json('Band ID Not Found')
    })
    .catch(error => {
      res.status(500).json('Error Deleting Band')
    })
});

module.exports = server;
