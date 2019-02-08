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

module.exports = server;