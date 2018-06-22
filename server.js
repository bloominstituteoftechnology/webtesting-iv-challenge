const express = require('express');
const User = require('./users/User');
const cors = require('cors');
var bodyParser = require('body-parser')

const server = express();
server.use(express.json());
server.use(cors());
server.use(bodyParser.json());

server.get('/', (req, res) => {
    res.status(200).json( {api: 'running'} );
});

server.post('/api/users', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(404).json({bullshit: "bullshit"});
        return;
    }
    User
        .create({ username, password })
        .then((user) => {
            res.status(201).json(user);
        })
        .catch(err => res.status(500).json(err));
});

server.delete('/api/users', (req, res) => {
    const { password } = req.body;
    if (!password) {
        res.status(404).json({bullshit: "bullshit"});
        return;
    }
    User
        .remove({})
        .then((result) => {
            res.status(200).json(result);
        })
        .catch(err => res.status(500).json(err));
});


module.exports = server;