const express = require('express');
const mongoose = require('mongoose');
const User = require('./users/User');
const port = 5000;

const server = express();

server.use(express.json())

mongoose.connect('mongodb://localhost/testdb')
  .then(() => console.log('\n===== DB Connected ====='))
  .catch(err => console.log(`\n===== ERROR =====\n${ err }`));


server.get('/', (req, res) => {
    res.status(200).json({ api: 'running' })
})

server.post('/api/users', (req, res) => {
    const { username, password } = req.body;

    User.create({ username, password })
        .then(user => {
            res.status(201).json(user)
        })
        .catch(err => {
            res.status(500).json(err);
        })
})

server.delete('/api/users/:id', (req, res) => {
    User
        .findByIdAndRemove(req.params.id)
        .then(user => {
            res.status(200).json({ success: `User has been removed from the database.` })
        })
        .catch(err => {
            res.status(500).json({ error: err.message })
        })
})

if (process.env.NODE_ENV !== 'test') 
    server.listen(port, () => console.log(`\n\n\n\n\n===== Server listening at http://localhost:${ port }`));


module.exports = server;