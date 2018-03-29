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
    res.send(teams);
  });
});

server.put('/team', (req, res) => {
  const { id, name, sport } = req.body;
  Band.findById(id, (err, team) => {
    if (err) {
      res.status(422).json({ error: 'Team not found by that Id' });
      return;
    }
    if (name) {
      team.name = name;
    }
    if (sport) {
      team.sport = sport;
    }
    team.save((error, savedTeam) => {
      if (error) res.status(500).json(error);
      res.status(200).json(savedTeam);
    });
  });
});

server.delete('/teams/:id', (req, res) => {
  const { id } = req.params;
  const team = ({ name, sport } = req.body);
  Team.findByIdAndRemove(id, (err, team) => {
    if (err) return res.send(err);
    res.send({ message: `successfully deleted ${team}` });
  });
});

module.exports = server;
