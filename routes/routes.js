module.exports = (app) => {

	const playerControllerMethods = require('../controllers/playerControllers');

	app.route('/players')
		.get(playerControllerMethods.getPlayers);
		.post(playerControllersMethods.createPlayer)

	app.route('/playerId/:playerId')
		.put(playerControllerMethods.updatePlayer);
		.delete(playerControllerMethods.deletePlayer);
};
