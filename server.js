const express = require('express');
const server = express();

server.use(express.json());

let database = [
  {
    name: 'Brian',
    breed: 'Labrador',
    age: 8,
  },
  {
    name: 'Lulu',
    breed: 'Samoyed',
    age: 4,
  },
  {
    name: 'Icy',
    breed: 'Pomeranian',
    age: 2,
  }
];

server.route('/')
  .get((req, res) => res.status(200).json({ message: 'En vivo!' }))

server.route('/dogs')
  .post((req, res) => {
    const { name, breed, age } = req.body;
    database.push({ name, breed, age })
    res.status(201).json({ mensaje: 'El perro fue creado!' })
  })

module.exports = server;
