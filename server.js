const express = require('express');
const knex = require('knex');

const knexConfig = require('./knexfile');

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());

server.post('/testserver', (req, res) => {
	const { thing } = req.body;

	db('things')
		.insert({ thing })
		.then(([id]) => {
			res.status(201).json({ message: `${thing} added with id ${id}` });
		})
		.catch(err => {
			if (err.code === 'SQLITE_CONSTRAINT') {
				res.status(409).json({ error: `${thing} already exists` });
			} else {
				res.status(500).json(err);
			}
		});
});

server.delete('/testserver/:id', (req, res) => {
	const { id } = req.params;
	console.log(id);

	db('things')
		.where({ id })
		.del()
		.then(count => {
			if (count) {
				res.status(200).json({ message: `thing with id ${id} deleted` });
			} else {
				res.status(404).json({ error: `no thing with id ${id} to delete` });
			}
		})
		.catch(err => res.status(500).json(err));
});

module.exports = server;
