const express = require('express');
const server = express();
server.use(express.json());
const knex = require('knex');

const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

server.get('/', (req, res) => {
  res.status(200).json({ message: "Server running" });
});

server.get('/api/ice-cream', (req, res) => {
  db('orders')
    .then(orders => {

      if (!orders || orders.length < 1) {
        res.status(404).json({ missingError: 'Could not find any recent ice-cream orders' });
      } else {
        res.status(200).json(orders);
      }

    })
    .catch(err => res.status(500).json(err));
})

server.get('/api/ice-cream/:id', (req ,res) => {
  const { id } = req.params;

  db('orders').where({ id }).first()
    .then(order => {

      if (order) {
        res.status(200).json(order);
      } else {
        res.status(404).json({ missingError: 'Could not find an order by that order number' });
      }

    })
    .catch(err => res.status(500).json(err));
});

server.post('/api/ice-cream', (req, res) => {
  let { flavor, scoops } = req.body;

  db.insert({ flavor, scoops })
    .into('orders')
    .then(order => {

      if(!req.body.flavor || !req.body.scoops) {
        res.status(400).json({ fillError: 'Please enter a flavor, and the amount of scoops' })
      } else {
        res.status(201).json({ orderId: order });
      }

    })
    .catch(err => res.status(500).json(err));
});

server.delete('/api/ice-cream/:id', (req, res) => {
  const { id } = req.params;

  db('orders').where({ id }).del()
    .then(response => {
      if (response) {
        res.status(200).json({ success: 'order deleted' });
      } else {
        res.status(404).json({ missingError: 'Could not find order by that ID' });
      }
    })
    .catch(err => res.status(500).json(err));
})


module.exports = server;