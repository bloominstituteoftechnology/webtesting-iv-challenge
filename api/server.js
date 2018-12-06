const express = require('express');
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
	res.status(200).json({ api: 'running' });
});

server.get('/', (req, res) => {
	res.status(200).json({ api: 'up' });
});

server.post('/fighter', (req, res) => {
	const { name, attack } = req.body;
	res.status(200).json({ message: `${name} used ${attack}` });
});

const port = process.env.PORT || 9000;

module.exports = server;
