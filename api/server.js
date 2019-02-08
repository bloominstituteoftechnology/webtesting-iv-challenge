//create express server
const express = require('express');
const server = express();

const filename = '../data/cars.json'
const carsData = require(filename);

//built-in & 3rd party middleware
server.use(express.json());

//route handlers
server.get('/',(req, res)=>{
  res.status(200).json(carsData);
})

//export the server
module.exports = server;