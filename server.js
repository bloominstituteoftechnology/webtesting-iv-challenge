const express = require('express');

const server = express();

server.use(express.json());

let names =[{name: "Su", id: 1}, {name: "Ron", id: 2}];

let count = 3;

server.get('/', (req, res)=> {
	res.status(200).json({api: 'running'});

});


server.post('/greet', (req, res) => {
	const {name} = req.body;
	const l1= names.length;
	names.push({name: name, id: count});
	count+=1;

	console.log(names);
	const l2 =names.length;

	if(l2 > l1) res.status(200).json({Hi: name});
	else res.status(404).send('not successful');

});

server.post('/greet/:name', (req, res) => {
	console.log(req.body.lastName);
	const {name} = req.params;
        const {lastName} = req.body;

	

	if(name ===undefined || !lastName){
	 res.status(422).json({error: "Name and Last name required"});
	}
	else{
	names.push({name: name, id: count});
        count+=1;

        res.status(200).json({hello:`${name} ${lastName}`});
	}

});

server.delete('/greet/:id', (req, res) => {
	const { id } = req.params;
	console.log(id);
	let l1 =names.length;

	let newNames = names.filter(item => {

		if(item.id!= id) {
			return item;
		}


	});
	
	names=newNames;
	console.log(names);
	let l2 = names.length;

	if(l1 > l2) res.status(200).json({message: 'Deleted'});
	else res.status(404).json({message: "Delete unsuccessful"});

});


module.exports = server;
