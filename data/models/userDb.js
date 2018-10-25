const db = require('../dbConfig.js');

module.exports = {
	get: function(id) {
		let query = db('users');
		if (id) query.where({ id }).first();
		return query;
	},
	insert: function(user) {
		return db('users')
			.insert(user)
			.then(([id]) => this.get(id));
	},
};
