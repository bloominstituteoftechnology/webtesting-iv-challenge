const express = require('express');
const server = express();
let db = require("../data/animalsModel");

server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'up' });
});

const port = process.env.PORT || 9000;

module.exports = server;