const express = require('express');
const server = express();
const Topping = require('./model');


server.use(express.json());

server.get('/api/toppings', (req, res) => {
  Topping.find({}, (err, topping) => {
    if (err) return res.send(err);
    res.status(200).json(topping);
  });
});

server.post('/api/topping', (req, res) => {
  const topping = new Topping(req.body);
  topping.save((err, newTopping) => {
    if (err) return res.send(err);
    res.status(200).json(newTopping);    
  });
})

server.delete('/api/delete/:id', (req, res) => {
  Topping.findOneAndRemove(req.params.id, (err, deleted) => {
    if (err) return res.send(err);
    res.status(200).send(deleted);
  });
});

server.put('/api/update/:id', (req, res) => {
  const { name, category } = req.body;
  Topping.findByIdAndUpdate(
    { _id: req.params.id }, 
    { name, category }, 
    { new: true }, 
    (err, updatedTopping) => {
    if (err) return res.send(err);
    res.status(200).send(updatedTopping);
  });
});

module.exports = server;