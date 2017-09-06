const express = require('express');
const bodyParser = require('body-parser');
const Food = require('./food');

const server = express();
server.use(bodyParser.json());

// curl http://localhost:8080/food
server.get('/food', (request, response) => {
  // Model.find will always return an array
  Food.find({}, (err, food) => {
    if (err) return response.send(err);
    response.send(food);
  });
});

module.exports = server;
