const express = require('express');
const Dessert = require('./dessert');
const server = express();
server.use(express.json());

server.get('/api/desserts', (req, res) => {
  Dessert.find({}, (err, dessert) => {
    if (err) {
      res.status(500).json({ error: 'Cannot find your desserts' });
    }
    res.json(dessert);
  });
});

server.put('/api/desserts/:id', (req, res) => {
  Dessert.findByIdAndUpdate(req.params.id, req.body, (err, dessert) => {
    if (err) {
      res.status(500).json({ error: 'Cannot update desserts' });
    }
    res.json(dessert);
  });
});

server.post('/api/desserts', (req, res) => {
  const { name, variety } = req.body;
  const newDessert = new Dessert({ name, variety });
  newDessert.save((err, dessert) => {
    if (err) {
      res.status(500).json({ error: 'Cannot post desserts' });
    }
    res.json(dessert);
  });
});

server.delete('/api/desserts/:id', (req, res) => {
  Dessert.findByIdAndRemove(req.params.id, (err, dessert) => {
    if (err) {
      res.status(500).json({ error: 'Cannot delete desserts' });
    }
    res.json(dessert);
  });
});

module.exports = server;
