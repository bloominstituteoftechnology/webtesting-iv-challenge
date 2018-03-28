const express = require('express');
const morgan = require('morgan');

const server = express();
server.use(morgan('combined'));
server.use(express.json());

// dummy data
const teams = [
	{name: 'Oakland Raiders', sport: 'Football'},
	{name: 'Chicago Cubs', sport: 'Baseball'},
	{name: 'San Antonio Spurs', sport: 'Basketball'}];

server.post('/team', (req, res) => {
  res.send(req.body);
});

server.get('/teams', (req, res) => {
    res.json(teams);
});

server.put('/team', (req, res) => {
	teams[0].name = req.body.name;
   res.json(teams[0]);
});

module.exports = server;