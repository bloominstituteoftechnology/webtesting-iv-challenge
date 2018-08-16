const express = require('express');

const server = express();

server.use(express.json());


server.get('/', (req, res)=> {
	res.status(200).json({api: 'running'});

});


server.post('/names', (req, res) => {
	const {name} = req.body;
	res.status(200).json({Hi: name});


});


module.exports = server;
