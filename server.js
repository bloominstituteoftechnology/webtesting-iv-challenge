const express = require('express');
const morgan = require('morgan');

const server = express();
server.use(morgan('combined'));
server.use(express.json());

const Team = require('./models');

// dummy data
// const teams = [
// 	{name: 'Oakland Raiders', sport: 'Football'},
// 	{name: 'Chicago Cubs', sport: 'Baseball'},
// 	{name: 'San Antonio Spurs', sport: 'Basketball'}];

server.post('/team', (req, res) => {
    const newTeam = new Team(req.body);
    newTeam
    .save()
    .then((team) => res.json(team))
    .catch(err => res.send(err));
});

server.get('/teams', (req, res) => {
    res.json(teams);
});

server.put('/team', (req, res) => {
	console.log('put req body', req.body);
	teams[0].name = req.body.name;
   res.json(teams[0]);
});

server.get('/team', (req, res) => {
    res.json(team);
});

module.exports = server;