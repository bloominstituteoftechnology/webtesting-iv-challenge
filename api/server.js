const express = require('express');

const db =  require('../users/usersHelpers.js');

const server = express();

server.use(express.json());

server.get('/users', async (req, res) => {
    const rows = await db.getUsers();
    res
        .status(200)
        .json(rows);
});

server.post('/users', async (req, res) => {
    const newUser = req.body;
    if (newUser.username && newUser.password) {
        const ids = await db.addUser(newUser);
        res
            .status(201)
            .json(ids);
    } 
    else {
        res
            .status(400)
            .json({error: 'missing username or password'});
    }
});

module.exports = server;