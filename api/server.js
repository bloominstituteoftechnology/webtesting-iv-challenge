const express = require('express');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ message: 'server is up' });
});


server.post('/user', (req, res) => {
    const {firstName, lastName, password } = req.body;
    res.status(200).json({ message: `${firstName} ${lastName}`})
})


module.exports = server;