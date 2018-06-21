const express = require('express');
const mongoose = require('mongoose');
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ api: 'Server running!' });
});

server.get("/users", (req, res) => {
    User.find()
        .then(response => {
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

if (process.env.NODE_ENV !== 'test') {
    const port = 5000;
    server.listen(port, () => {
        console.log(`Server running port ${port}`)
    });
};

module.exports = server;