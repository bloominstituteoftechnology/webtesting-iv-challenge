const express = require('express');
const bodyParser = require('bodyParser');
const morgan = require('morgan');
const metasRouter = require('./metas/metasRouter.js');
const decksRouter = require('./decks/decksRouter.js');
const pilotsRouter = require('./pilots/pilotsRouter.js');
const server = express();
server.use(bodyParser.json());
server.use(morgan('dev'));

server.use('/api/metas', metasRouter);
server.use('/api/decks', decksRouter);
server.use('/api/pilots', pilotsRouter);

server.get('/', (req, res) => {
  Deck.find({}, (err, Deck) => {
    if (err) res.status(500).json(err);
    res.json(Deck);
  });
});

module.exports = { server };
