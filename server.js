const express = require('express');
const morgan = require('morgan');

const server = express();
server.use(morgan('combined'));
server.use(express.json());

const Car = require('./models');

server.post('/api/cars', (req, res) => {
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

server.get('/api/cars', (req, res) => {
  Car.find()
    .then(cars => {
      res.status(200).json(cars);
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

server.put('/api/cars/:id', (req, res) => {
  const { id } = req.params;
  const updatedCar = req.body;
  Car.findByIdAndUpdate(id, {$set: updatedCar}, {new: true})
  .then(update => {
    res.status(200).json(update);
  })
  .catch(err => {
    res.status(500).json(err);
  })
});

server.delete('/api/cars/:id', (req, res) => {
  const { id } = req.params;
  Car.findByIdAndRemove(id)
    .then(() => {
      res.status(200).json({ success: 'DELETED'});
    })
    .catch(err => {
      res.status(500).json({ err });
    })
});


module.exports = server;