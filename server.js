const express = require('express');
const server = express();
const Topping = require('./model');


server.use(express.json());

server.get('/api/toppings', (req, res) => {
  Topping.find({}, (err, topping) => {
    if (err) return res.send(err);
    res.status(200).send(topping);
  });
});

server.post('/api/topping', (req, res) => {
  res.json(req.body);
})

module.exports = server;