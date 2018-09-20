const express = require('express');
const server = express();
server.use(express.json()); 

const knex = require('knex'); 
const dbConfig = require("./knexfile");
const db = knex(dbConfig.development);

const cors = require('cors'); 
server.use(cors()); 


server.get('/users', (req, res) => {
    db('users')
        .then(user => {
            res.status(200).json(user)
        })
})

server.post('/users', (req, res) => {
    const newUser = req.body;

    db.insert(newUser).into('users')
        .then(user => {
            res.status(200).json({added: `${newUser.username} has been added!`})
        })
        .catch(err => {
            res.status(500).json({error: "User could not be added to the table 'Users'."})
        })
})

server.delete('/users/:id', (req, res) => {
    const id = req.params.id;

    db('users')
        .where('id', id)
        .del()
        .then(user => {
            res.status(200).json({deleted: `User with ID of ${id} has been deleted!`})
        })
        .catch(err => {
            res.status(500).json({error: "User could not be deleted from the table 'Users'."})
        })
})


module.exports = server;


