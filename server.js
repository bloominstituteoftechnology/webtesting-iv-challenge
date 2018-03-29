const express = require('express');
const morgan = require('morgan');
const Weapon = require('./models/WeaponsModel');
const mongoose = require('mongoose');

const server = express();

const PORT = 3000;

server.use(morgan('combined'));
server.use(express.json());

mongoose
  .connect('mongodb://localhost/test')
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch(err => console.log('Error connecting to MongoDB'));

server.get('/weapons', (req, res) => {
  Weapon.find({})
    .then(weapons => {
      res.status(200).send(weapons);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

server.post('/weapons', (req, res) => {
  const newWeapon = req.body;
  const weapon = new Weapon(newWeapon);
  weapon
    .save()
    .then(weapon => res.status(200).json(weapon))
    .catch(err =>
      res.status(500).json({ msg: 'Error saving the weapon', err })
    );
});

server.delete('/weapons/:name', (req, res) => {
  const { name } = req.params;
  Weapon.findOneAndRemove({ name })
    .then(weapon => {
      res.status(200).json(weapon);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.put('/weapons/:name', (req, res) => {
  const { name } = req.params;
  const weapon = req.body;
  Weapon.findOneAndUpdate({ name }, weapon, { new: true })
    .then(newWeapon => {
      console.log('then');
      res.status(200).json(newWeapon);
    })
    .catch(err => {
      console.log('catch');
      res.status(500).json(err);
    });
});

server.listen(PORT, err => {
  if (err) console.log(err);
  console.log(`server is listening on port ${PORT}`);
});

module.exports = server;
