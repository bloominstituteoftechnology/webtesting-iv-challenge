const express = require('express');
const knex = require("knex");

const users = require('../users.js');

const knexConfig = require("../knexfile.js");
const db = knex(knexConfig.development);

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    users
        .getUsers()
        .then(project => {
            res, status(200).json(project);
        }).catch(error => {
            res.status(500).json({ error: 'Can not find the users' });
        });
})


server.post('/addUser', (req, res) => {
    const { firstName, lastName } = req.body
    const user = { firstName, lastName };

    if (!user) {
        return res.status(400).send({ Message: "Please provide a First and Last Name" });
    }
    users
        .addUser(user)
        .then(user => {
            res.status(201).json({ Added: `${firstName} ${lastName}`});
        })
        .catch(error => {
            res.status(500).json({ error: 'Cannot add the new user' });
        });
})

module.exports = server;