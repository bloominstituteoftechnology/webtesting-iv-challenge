const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// Clear out mongoose's model cache to allow --watch to work for tests:
// https://github.com/Automattic/mongoose/issues/1251
// mongoose.models = {};
// mongoose.modelSchemas = {};

// mongoose.Promise = Promise;
// mongoose.connect('mongodb://localhost/players', { useMongoClient: true });

const PlayerSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	team: {
		type: String
	},
	position: {
		type: String
	},
	age: {
		type: Number
	}
});

module.exports = mongoose.model('Player', PlayerSchema);
