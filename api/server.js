//create express server
const express = require('express');
const server = express();

const filename = '../data/cars.json'
let carsData = require(filename);

//built-in & 3rd party middleware
server.use(express.json());

//testing route handler
server.get('/',(req, res)=>{
  res.status(200).json(carsData);
})

//GET Route Handler
server.get('/cars', (req, res)=>{
  res.status(200).json({carsData})
})

//POST Route Handler
server.post('/cars', (req, res) =>{
  const make = req.body.make;
  const model = req.body.model;
  carsData.push(req.body);
  res.status(201).json({name: `${make} ${model}`});
})

//DELETE Route Handler
server.delete('/cars/:id', (req, res)=>{
  const id = req.params.id;

  carsData = carsData.filter(car => {
    return car.id !== id;
  })
  res.status(200).json({id: id});
})

//export the server
module.exports = server;