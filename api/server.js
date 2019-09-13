const express = require('express');
const Drinks = require('../drinks/drinksModel');
const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ api: 'working' });
  });

  server.get('/drinks', (req, res) => {
    Drinks.getAll()
      .then(drinks => {
        res.status(200).json(drinks);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });

  module.exports= server;