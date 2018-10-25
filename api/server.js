const express = require('express');
const helmet = require('helmet');

const server = express();

server.use(
	express.json(),
	helmet(),
);


server.get('/', (req, res) => {
	return res.status(200).json('Server is running.');
});

module.exports = server;
