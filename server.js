const express = require('express');
const morgan = require('morgan');

const server = express();
server.use(morgan('combined'));
server.use(express.json());

const Team = require('./models');

server.post('/team', (req, res) => {
  const teamInfo = req.body;
  const newTeam = new Team(teamInfo);

  newTeam
    .save()
    .then(team => {
      res.status(200).json(team);
    })
    .catch(err => {
      res.json(err);
    });
});

server.get('/team', (req, res) => {
  Team.find()
    .then(teams => {
      res.status(200).json(teams);
    })
});

server.put('/team', (req, res) => {
  const { name, sport } = req.body;

  Team.update({ name }, req.body)
    .then(team => {
      Team.find({ name }).then(team => {
        res.status(200).json(team);
      });
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = server;