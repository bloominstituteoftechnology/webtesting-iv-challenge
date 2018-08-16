const express = require('express');

const server = express();

server.use(express.json());


server.get('/', (req, res) => {
  res.status(200).send('API is running');
});

server.post('/greet/:name', (req, res) => {
	const { lastName } = req.body;
	const { name } = req.params;

	res.status(200).json({ hello: `${name} ${lastName}`});
});


module.exports=server;
