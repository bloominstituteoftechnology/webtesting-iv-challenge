const express = require('express');
const morgan = require('morgan');

const server = express();
server.use(morgan('Combined'));
server.use(express.json());

const User = require('./Users');

server.get('/users', (req, res) => {
  User.find()
    .then(user => res.status(200).json(user))
    .catch(err => res.status(422).json({ err: err }));
});

server.post('users', (req, res) => {
    User.Create(req.body)
        .then(user => res.status(200).json({ success: 'User created'}))
        .catch(err => res.json({ msg:'Could not create User', err}))
});

module.exports = server;
