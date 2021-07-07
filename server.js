const express = require('express');
const Food = require('./foodSchema/foodSchema.js');
const server = express();

server.get('/', (req, res) => {
  res.status(201).json({api: 'API is totally running'});
})

server.get('/api/food', (req, res) => {
  Food.find()
  .then(foods => res.status(200).send({ foods }))
  .catch(err => res.status(500).send(err))
})

server.post('/api/food', (req, res) => {
  Food.create(req.body)
  .then(food => res.status(201).send({ food }))
  .catch(err => res.status(500).send(err))
})

if (process.env.NODE_ENV !== 'test') {
  server.listen(9000);
}



module.exports = server;