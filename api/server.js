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

// get a user in db with given id
server.get('/api/users/:id', (req, res) => {
	const { id } = req.params;
	return userDb
		.get(id)
		.then(user => {
			if (user) return res.status(200).json(user);
			return res.status(404).json({ error: `No user with id ${ id } exists.`});
		})
		.catch(err => res.status(500).json(`Server could not retrieve users information: ${ err }`));
});

// insert a new user into the db and return that newly inserted user's info
server.post('/api/users/:first_name', (req, res) => {
	const { first_name } = req.params;
	const { last_name } = req.body;
	if (!last_name) return res.status(400).json({ error: 'Last name must not be missing.' });
	return userDb
		.insert({ first_name, last_name })
		.then(user => res.status(201).json(user))
		.catch(err => res.status(500).json(`Server could not insert new user: ${ err }`));
});

// delete a user from the db
server.delete('/api/users/:id', (req, res) => {
	const { id } = req.params;
	return userDb
		.remove(id)
		.then(del => {
			if (del) return res.status(200).json({ message: `User with id ${ id } successfully deleted.` });
			return res.status(404).json({ error: `User with id ${ id } does not exist.` });
		})
		.catch(err => res.status(500).json(`Server could not delete user: ${ err }`));
});

module.exports = server;
