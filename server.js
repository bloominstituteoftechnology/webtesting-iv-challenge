const express = require('express');
const server = express();

server.use(express.json());

let database = [
  {
    id: 1,
    name: 'Brian',
    breed: 'black labrador',
  },
  {
    id: 2,
    name: 'Lulu',
    breed: 'samoyed',
  },
  {
    id: 3,
    name: 'Icy',
    breed: 'pomeranian',
  }
];

server.route('/')
  .get((req, res) => res.status(200).json({ message: 'En vivo!' }))

server.route('/dogs')
  .post((req, res) => {
    const { id, name, breed } = req.body;
    database.push({ id, name, breed })
    res.status(201).json({ mensaje: 'El perro fue creado!' })
  })

server.route('/dogs/:id')
  .delete((req, res) => {
    const { id } = req.params;
    if (!id) return res.status(404).json({ error: 'Necesita un numero!' })
    if (database.find(dog => Number(dog.id) === Number(id))) {
      const filtered = database.filter(dog => Number(dog.id) !== Number(id))
      return res.status(202).json(filtered);
    }
    return res.status(404).json({ error: 'El pero no encontrado!' })
  })

module.exports = server;
