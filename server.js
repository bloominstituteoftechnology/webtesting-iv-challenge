const express = require('express');
const server = express();
server.use(express.json());
const users = require('./data/usersModel');

server.get('/', (req, res) => {
    res.send({API: 'live'})
})

server.post('/api/users', async (req, res) => {
    try {
        let response = await users.insert(req.body)
        res.status(201).json(response)
      } catch(err) {
        console.log(err);
      } 
})

server.delete('/api/users/:id', async (req, res) => {
    const {id} = req.params;
    try {
        let response = await users.remove(id)
        res.status(200).json(response)
      } catch(err) {
        console.log(err);
      } 
})

module.exports = server;