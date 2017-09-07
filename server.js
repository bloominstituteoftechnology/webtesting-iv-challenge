const express = require('express');
const bodyParser = require('body-parser');
const Team = require('./TeamModel');

const server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

const apiRoutes = express.Router();

apiRoutes.get('/allteams',(req, res) => {
  Team.find({}, (err, teams) => {
    if (err) return err;
    res.json(teams);
  });
});

apiRoutes.post('/addteam', (req, res) => {
  const { name } = req.body;
  const newTeam = new Team({ name });
  newTeam.save((err, team) => {
    if (err) return res.json(err);
    res.json(team);
  })
});

apiRoutes.put('/editteam', (req, res) => {
  const { name, oldName } = req.body;
  Team.findOneAndUpdate({ name: oldName }, { $set: { name }}, { new: true}, (err, team) => {
    if (err) return console.log(err);
    // console.log('inside edit: ', team);
    res.json(team)
  });
});

apiRoutes.delete('/removeteam', (req, res) => {
  const { name } = req.body;
  Team.findOneAndRemove({ name }, (err, team) => {
    if (err) return console.log(err);
    res.json(team)
  });
});

server.use('/api', apiRoutes);
module.exports = server;
