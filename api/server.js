const express = require('express');
const server = express();
const users = require('../users/usersModel');
server.use(express.json());

server.get('/', (req,res) => {
   res.status(200).json({Running: `Server is up and running`});
});

server.get('/users', (req,res) => {
   res.status(200).json({name:'venky', age:39, married:true});
});

server.post('/users', (req,res) => {
   const user = req.body;
   users.insert(user)
        .then( ids => {
           res.status(201).json(ids);
        })
        .catch(err => {
           res.status(500).json({err:`Cannot add a user at this time`});
        })
})

module.exports = server;