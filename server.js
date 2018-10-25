const express = require('express');

const { errorHandler } = require('./api/errorHandler/handlers');

const server = express();
server.use(express.json());

let id = 0;
let state = [];

server.post('/api/employees', (req, res, next) => {
	if (req.body.name && req.body.department) {
		const { name, department } = req.body;
		state.push({ id, name, department });
		id++;
		res.status(201).json({ employeeId: id });
	} else {
		next(['h400', 'Missing name of department property.']);
	}
});

server.delete('/api/employees/:id', (req, res, next) => {});

server.use((req, res, next) => {
	next(['h404', `The requested path '${req.path}' doesn't exist.`]);
});

server.use(errorHandler);

module.exports = server;
