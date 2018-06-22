const mongoose = require('mongoose');
const express = require('express');
const server = express();

const port = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost/servertestDB');

server.get('/', (req, res) => {
    res.status(200).json({ api: 'running' });
});

server.get('/users', (req, res) => {
    User
        .find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(error => {
            res.status(500).json({ 
                errorMessage: error.message
            });
        });
});

server.get('/users/:id', (req, res) => {
    const { id } = req.params;
    User
        .findById(id)
        .then(user => {
            res.status(200).json(users)
        })
        .catch(error => {
            res.status(500).json({
                errorMessage: error.message
            });
        });
})

server.post('/users', (req, res) => {
    const user = req.body;
    User
        .create(user)
        .then(user => res.status(201).json(user))
        .catch(error => {
            res.status(500).json({
            errorMessage: error.message
            });
        });
});

server.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    User
        .findByIdAndRemove(id)
        .then(response => res.status(200).json({
            response: 'user deleted'
        }))
        .catch(error => {
            res.status(500).json({
                errorMessage: error.message
            });
        });
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

module.exports = server;
