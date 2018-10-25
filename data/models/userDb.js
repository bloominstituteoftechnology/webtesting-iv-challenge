const db = require('../dbConfig.js');

module.exports = {
	get: function(id) {
		let query = db('users as u');
		if (id) query.where({ id }).first();
		return query;
	},
};
