const express = require('express');
const knex = require("knex");

const users = require('../users.js');

const knexConfig = require("../knexfile.js");
const db = knex(knexConfig.development);

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ api: 'up' });
});


server.get('/users', (req, res) => {
    users
        .getUsers()
        .then(user => {
            res.status(200).json(user);
        }).catch(error => {
            console.log(user)
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
        .then(ids => {
            res.status(201).json({ Added: `${user.firstName} ${user.lastName}`});
        })
        .catch(error => {
            res.status(500).json({ error: 'Cannot add the new user' });
        });
})

server.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    db('users')
        .where({ id: id })
        .del()
        .then(count => {
            res.status(200).json({ count })
        })
        .catch(error => res.status(500).json(error));
})

module.exports = server;
