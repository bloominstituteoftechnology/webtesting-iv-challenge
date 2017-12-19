const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Item = require('./walmart');
const server = express();

server.use(bodyParser.json());
server.use(morgan('combined'));

server.get('/items', (req, res) => {
  Item.find({}, (err, list) => {
    if (err) return res.status(500).json({ err });
    res.status(200).json(list);
  });
});

server.post('/items', (req, res) => {
  const { name, salePrice, brandName, color, stock } = req.body;
  const item = new Item({ name, salePrice, brandName, color, stock });
  item.save((err, newItem) => {
    if (err) return res.status(500).json({ err });
    res.status(201).json(newItem);
  });
});

// server.delete('/items/:id', (req, res) => {
//   const { id } = req.params;
//   Item.remove({ _id : id }, (err, removedItem) => {
//     if (err) return res.status(500).json({ err });
//     res.status(200).json({ success: false });
//   });
// });

module.exports = server;