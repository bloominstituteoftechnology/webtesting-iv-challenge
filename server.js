const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const Recipe = require('./recipemodel');

const server = express();
server.use(bodyParser.json());
server.use(morgan('combined'));

server.get('/recipes/:recipeTitle', (req, res) => {
  const title = req.params;
})

module.exports = server;