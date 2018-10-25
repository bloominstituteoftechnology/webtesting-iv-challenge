const express = require('express');
const knex = require('knex');

const knexConfig = require('./knexfile');

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());

server.post('/testserver', (req, res) => {
	const { thing } = req.body;

	db.insert(thing)
		.then(([id]) => {
			res.status(201).json({ message: `${thing} added with id ${id}` });
		})
		.catch(err => res.status(500).json(err));
});

server.delete('/testserver', (req, res) => {
	const { thing } = req.body;

	db.delete(thing)
		.then(count => {
			if (count) {
				res.status(204).json({ message: `${thing} deleted` });
			} else {
				res.status(404).json({ message: `no ${thing} to delete` });
			}
		})
		.catch(err => res.status(500).json(err));
});

const port = 5000;
server.listen(port, () => {
	console.log(`\n=== Listening on http://localhost:${port} ===\n`);
});
