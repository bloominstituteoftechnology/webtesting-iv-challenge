const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

const server = express();
const Marsupial = require('./models/marsupial');

server.use(morgan('combined'));
server.use(bodyParser.json());

server.get('/', (req, res) => {
    res.status(200).json({ message: 'The server arises from the depths of the sea!' });
});

server.post('/api/marsupials', (req, res) => {
    const { name, latinName, region } = req.body;
    if (!name || !latinName || !region) {
      return res.status(400).json({ error: 'Each marsupial requires a common name, a latin name, and a general region' });
    }
    const newMarsupial = new Marsupial({ name, latinName, region });
    newMarsupial.save()
      .then((savedMarsupial) => {
        if (!savedMarsupial) res.status(422).json({ error: 'Failed to save the marsupial to the database' });
        res.status(201).json({ marsupial: savedMarsupial });
      })
      .catch((error) => {
        res.status(500).json({ error });
    });
  });
  
  server.get('/api/marsupials', (req, res) => {
    Marsupial.find({})
      .then(marsupials => {
        if (marsupials.length < 1) res.status(422).json({ error: 'Marsupials not found' });
        res.status(200).json(marsupials);
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  });
  
  server.get('/api/marsupials/:id', (req, res) => {
    const { id } = req.params;
    Marsupial.findById(id)
      .then(marsupial => {
        if (!marsupial) res.status(422).json({ error: 'Marsupial not found' });
        res.status(200).json(marsupial);
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  });
  
  server.put('/api/marsupials/:id', (req, res) => {
    const { id } = req.params;
    const update = req.body;
    Marsupial.findById(id)
      .then(marsupial => {
        if (!marsupial) res.status(422).json({ error: 'Marsupial not found' });
        const newMarsupial = Object.assign(marsupial, update);
        return newMarsupial.save();
      })
      .then(updateMarsupial => {
        if (!updateMarsupial) res.status(422).json({ error: 'Marsupial has been update failed' });
        res.status(200).json(updateMarsupial);
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  });
  
  server.delete('/api/marsupials/:id', (req, res) => {
    const { id } = req.params;
    Marsupial.findByIdAndRemove(id)
      .then(() => {
        res.status(200).json({ success: 'Marsupial has been deleted' });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  });
  
mongoose
    .connect("mongodb://localhost/Marsupials")
    .then(db => {
        console.log(`Successfully connected to the ${db.connections[0].name} database`);
    });

module.exports = server;