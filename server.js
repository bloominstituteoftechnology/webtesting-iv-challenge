const express = require('express');

const server = express();

server.use(express.json());


server.get('/', (req, res)=> {
	res.status(200).json({api: 'running'});

});


server.post('/greet', (req, res) => {
	const {name} = req.body;
	res.status(200).json({Hi: name});


});

server.post('/greet/:name', (req, res) => {
	const {name} = req.params;
        const {lastName} = req.body;

        res.status(200).json({hello:`${name} ${lastName}`});


});

module.exports = server;
