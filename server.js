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

module.exports = server;