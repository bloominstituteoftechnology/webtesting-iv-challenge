const express = require('express');

const User = require('./models/User');

const server = express();

server.use(express.json())

server.get('/', (req, res) => {
    res.status(200).json({ api: 'running!' })
});

server.get('/api/users', (req, res) => {
    User.find().then(users => res.status(200).json({ users})).catch(err => res.status(500).json({ error: 'error fetching users'}));
});

server.get('/api/users/:id', (req, res) => {
    User.findById(req.params.id).then(user => res.status(200).json({ user })).catch(err => res.status(500).json({ err: 'error finding user with that id'}));
});

server.post('/api/users', (req, res) => {
    User.create(req.body).then(user => res.status(201).json({ user })).catch(err => res.status(500).json({ err : 'error creating user'}));
});

server.put('/api/users/:id', (req, res) => {
    User.findIdByAndUpdate(req.params.id, req.body).then(user => res.status(200).json({ user })).catch(err => res.status(500).json({ err : 'error updating user'}));
});

server.delete('/api/users/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id).then(msg => res.status(200).json({ msg: 'successfully deleted user' })).catch(err => res.status(500).json({ err : 'error deleting user'}));
});

if(process.env.NODE_ENV !== 'test') {
    server.listen(5000);
}


module.exports = server;