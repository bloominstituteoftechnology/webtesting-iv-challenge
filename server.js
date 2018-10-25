const express = require('express');
const server = express();
const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan')
const knex = require('knex')

const dbConfig = require('./knexfile')
const db = knex(dbConfig.development)

server.use(express.json());
server.use(helmet());
server.use(morgan('tiny'))
server.use(cors())

//test to make sure its working
server.get('/', (req, res) => {
	res.status(200).send('its working')
})

//post request
server.post('/users', (req, res) => {
	const {username, email} = req.body;

	if(!req.body.username || !req.body.email){
		res.status(400).json({msg: 'please provide all information'})
	} else {
		db.insert({username, email}).into('users')
			.then(response => {
				res.status(201).json(response[0])
			})
			.catch(error => {
				console.log(error)
				res.status(500).json({msg: "there was an error creating user"})
			})
	}
})

//delete request
//-------------------------------------------
server.delete('/users/:id', (req, res) => {
	const { id } = req.params;
	db('users')
	.where({id: id})
	.del()
	.then(response => {
		if (response === 0){
			return res.status(404).json({msg: 'no user there to delete'})
		}

		if (response === 1){
			return res.status(200).json(response)
		}
	})
	.catch(error => {
		res.status(500).json(error)
	})
})

module.exports = server;

//server.listen(9000, () => console.log('running on port 9000'))