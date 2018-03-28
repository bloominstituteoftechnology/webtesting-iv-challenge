const express = require('express');
const morgan = require('morgan');

const server = express();
server.use(morgan('combined'));
server.use(express.json());

// dummy data
const teams = [
	{name: 'Raiders', sport: 'Football'},
	{name: 'Cubs', sport: 'Baseball'},
	{name: 'Spurs', sport: 'Basketball'}];

server.post('/team', (req, res) => {
  res.send(req.body);
});

server.get('/teams', (req, res) => {
    res.json(teams);
});

module.exports = server;