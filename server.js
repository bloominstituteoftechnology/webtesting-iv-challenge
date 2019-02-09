const express = require('express');
const users = require('./usersModel');
const server = express();

const PORT = process.env.PORT || 42;

server.use(express.json());

server.get('/', async (req, res) => {
    await
    res
        .status(200)
        .json({ API: 'working' });
});

server.get('/users', async (req, res) => {
    const rows = await users.getAll();
    res
        .status(200)
        .json(rows);
});

server.post('/users', async (req, res) => {
    const userData = req.body;
    if (userData.name) {
        const ids = await users.insert(userData);
        res
            .status(201)
            .json(ids);
    } else {
        res
            .status(400)
            .json({ message: 'must enter name' });
    }
});

module.exports = {
    server,
    PORT
};