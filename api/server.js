const express = require('express');
const helmet = require('helmet');

const server = express();

// middleware
server.use(
	express.json(),
	helmet(),
);

// db
const userDb = require('../data/models/userDb.js');

server.get('/', (req, res) => {
	return res.status(200).json('Server is running.');
});

// get all users in db
server.get('/api/users/', (req, res) => {
	return userDb
		.get()
		.then(users => res.status(200).json(users))
		.catch(err => res.status(500).json(`Server could not retrieve users information: ${ err }`));
});

module.exports = server;
