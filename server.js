const express = require('express');
const morgan = require('morgan');

const server = express();
server.use(morgan('combined'));
server.use(express.json());

const Team = require('./models');

server.post('/team', (req, res) => {
    const newTeam = new Team(req.body);
    newTeam
    .save()
    .then((team) => res.json(team))
    .catch(err => {
        res.send(err)
    });
});

server.get('/teams', (req, res) => {
	Team.find({}, function (err, teams){
		res.json(teams);
	});
});

server.put('/team', (req, res) => {
	teams[0].name = req.body.name;
   res.json(teams[0]);
});

server.get('/team', (req, res) => {
    res.json(team);
});

module.exports = server;