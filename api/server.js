const express = require('express');
const server = express();
let db = require("../data/animalsDB");
const helpers = require("../data/animalsModel");

server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'up' });
});

server.post('/animals', (req, res) => {
    helpers.insert(db, req.body)
    res.status(200).json(db.length);
});

server.delete('/animals', async (req, res) => {
    await helpers.remove(db, req.body)
    await res.status(202).json(db.length);
});

const port = process.env.PORT || 9000;

module.exports = server;