const express = require('express');
const server = express();
 server.use(express.json());
 server.get('/users', (req, res) => {
    res.status(200).json({users: 'array of users'});
})

 module.exports = server;