const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const server = express();
const User = require('./models/userModel');

server.use(morgan('combined'));
server.use(bodyParser.json());

// create user
server.post('/api/users', (req, res) => {
    const { firstName, lastName, email } = req.body;
    if (!firstName || !lastName || !email) {
        return res
            .status(400)
            .json({ error: 'First name, Last name, and email are required.' });
    }
    const newUser = new User({ firstName, lastName, email });
    newUser
        .save()
        .then(savedUser => {
            if (!savedUser) res.status(422).json({ error: 'User save failed' });
            res.status(201).json({ user: savedUser });
        })
        .catch(error => {
            res.status(500).json({ error });
        });
});

// get all users
server.get('/api/users', (req, res) => {
    User.find({})
        .then(users => {
            if (users.length < 1)
                res.status(422).json({ error: 'Users not found' });
            res.status(200).json(users);
        })
        .catch(error => {
            res.status(500).json({ error });
        });
});

// get user by id
server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    User.findById(id)
        .then(user => {
            if (!user) res.status(422).json({ error: 'User not found' });
            res.status(200).json(user);
        })
        .catch(error => {
            res.status(500).json({ error });
        });
});

// update user by id
server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const update = req.body;
    User.findById(id)
        .then(user => {
            if (!user) res.status(422).json({ error: 'User not found' });
            const newUser = Object.assign(user, update);
            return newUser.save();
        })
        .then(updateUser => {
            if (!updateUser)
                res.status(422).json({ error: 'User update failed' });
            res.status(200).json(updateUser);
        })
        .catch(error => {
            res.status(500).json({ error });
        });
});

// delete user by id
server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    User.findByIdAndRemove(id)
        .then(() => {
            res.status(200).json({ success: 'User deleted' });
        })
        .catch(error => {
            res.status(500).json({ error });
        });
});

module.exports = server;
