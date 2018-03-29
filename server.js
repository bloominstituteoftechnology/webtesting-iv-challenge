const express = require('express');
const morgan = require('morgan');

const server = express();
server.use(morgan('combined'));
server.use(express.json());

const Team = require('./models');

server.post('/teams', (req, res) => {
  const teamInfo = req.body;
  const newTeam = new Team(teamInfo);

  newTeam.save((err, team) => {
    if (err) return res.send(err);
    res.send(team);
  });
});

server.get('/teams', (req, res) => {
  Team.find({}, (err, teams) => {
    if (err) return res.send(err);
    res.send(teams)
  });
});

server.put('/teams/:id', (req, res) => {
  const { id } = req.params;
  const team = req.body;
  Team.findByIdAndUpdate(id, (err, team) => {
    if (err) return res.send(err);
    res.status(200).send(id)
  });
});

server.delete('/teams/:id', (req, res) => {
  const { id } = req.params;
  const team = { name, sport } = req.body;
  Team.findByIdAndRemove(id, (err, team) => {
    if (err) return res.send(err);
    res.send({ message: `successfully deleted ${team}` })
  });
});

module.exports = server;