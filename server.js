const express = require('express');
const morgan = require('morgan');

const server = express();
server.use(morgan('combined'));
server.use(express.json());

const Team = require('./models');

server.post('/api/team', (req, res) => {
    const newTeam = new Team(req.body);
    newTeam
    .save()
    .then((team) => res.json(team))
    .catch(err => {
        res.send(err)
    });
});

server.get('/api/teams', (req, res) => {
	Team.find({}, function (err, teams){
		res.json(teams);
	});
});

server.put('/api/team', (req, res) => {
    const { name, sport } = req.body;
    Team.findOneAndUpdate({ name }, {$set:{sport}}, { new: true }, function(err, team){
        if(err){
            res.send(err);
        }
        res.json(team);
    });
    // .then(team => res.json(team))
    // .catch(err => res.send(err));
});

// server.get('/api/team', (req, res) => {
//     res.json(team);
// });

server.delete('/api/team', (req, res) => {
    const { name, sport } = req.body;
    Team.findOneAndRemove({ name }, function (err, team){
        if (err) res.json(err);
        res.json(team);
    });
});

module.exports = server;