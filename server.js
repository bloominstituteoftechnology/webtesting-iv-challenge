const express = require('express');
const morgan = require('morgan');

const server = express();
server.use(morgan('combined'));
server.use(express.json());

const Car = require('./models');

server.post('/cars', (req, res) => {
  const { manufacturer, name } = req.body;
  const newCar = new Car({ manufacturer, name });
  newCar.save()
    .then(car => {
      res.status(200).json(car);
    })
    .catch(err => {
      res.status(500).json(err);
    })
});

server.put('/cars/:id', (req, res) => {
  const { id } = req.params;
  const updatedCar = req.body;
  Car.findByIdAndUpdate(id, updatedCar, (error, car) => {
    if(error) return res.send(error);
    return res.send(car);
  });
});
server.get('/cars', (req, res) => {
  Car.find({}, (error, cars) => {
    if (error) return res.send(error);
    return res.send(cars);
  });
});

module.exports = server;