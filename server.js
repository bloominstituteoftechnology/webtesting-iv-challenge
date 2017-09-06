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

// curl -X POST -H "Content-Type: application/json" -d '{"name":"Hot Dog"}' localhost:8080/food
server.post('/food', (request, response) => {
  const food = new Food(request.body);
  // Promises & mongoose: http://mongoosejs.com/docs/promises.html
  food.save((err, newFood) => {
    if (err) return response.send(err);
    response.send(newFood);
  });
});

// server.put('/food', (request, response) => {
//   //
// });
//
// server.delete('/food', (request, response) => {
//   //
// });


module.exports = server;
