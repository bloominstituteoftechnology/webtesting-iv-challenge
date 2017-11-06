const mongoose = require('mongoose');

require("../models/player");
const Player = mongoose.model('Post');

const getPlayers = (req, res) => {
	Player.find()
		.then((players) => {
			res.json(players);
		})
		.catch((err) => {
			res.status(500).json(err);
		})
}

const createPlayer = (req, res) => {
	const { firstName, lastName, team, position, age } = req.body;

	const newPlayer = new Player({ firstName, lastName, team, position, age });

	newPlayer.save()
		.then(player => {
			res.json({success: true});
		})
		.catch(err => {
			res.status(422).json(err);
		})
};

const updatePlayer = (req, res) => {
  const { playerId } = req.params;
  const updateData = req.body; // e.x. {age: 31, team: "Minnesota Vikings"}

  Player.findByIdAndUpdate(playerId, { $set: updateData}, { new: true }, (err, player) => {
    if (err) res.json(err);
    res.json({success: true});
  });
}

const deletePlayer = (req, res) => {
  const { playerId } = req.params;

  Player.findByIdAndRemove(playerId, (err) => {
    if (err) res.json(err);
    res.json({success: true});
  })
}


module.exports = {
  getPlayers,
  createPlayer,
  updatePlayer,
  deletePlayer
};