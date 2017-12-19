const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
// import in models
const Food = require('./food');
const server = express();
server.use(bodyParser.json());
server.use(morgan('combined'));

server.post('/food', (req, res) => {
  const { title } = req.body;
  const newFood = new Food({ title });
  newFood.save((err, savedFood) => {
    if (err) {
      res.status(422);
      res.json({ err: err.message });
      return;
    }
    res.json(savedFood);
  })
});

server.get('/food', (req, res) => { // we want to grab all the data that exists and send it back. this is where we need the beforeEach and afterEach on routes.test.js
  Food.find({}, (err, foods) => {
    if (err) {
      return res.status(500).json({ err: 'something bad'});
    }
    res.json(foods);
  });
});

module.exports = server;
