const express = require('express');
const bodyParser = require('bodyParser');
const morgan = require('morgan');
const Deck = require('.Deck.js');
const server = express();
server.use(bodyParser.json());
server.use(morgan('dev'));

server.get('/', (req, res) => {
  Deck.find({}, (err, Deck) => {
    if (err) res.status(500).json(err);
    res.json(Deck);
  });
});

module.exports = { server };
