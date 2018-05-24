const express = require('express');
const mongoose = require('mongoose');
const User = require('./users/User');

const server = express();

mongoose
  .connect(`mongodb://localhost/testingdb`)
  .then(() => console.log("\n=== API Connected to Database ===\n"))
  .catch(err => console.log("\n*** ERROR Connecting to Database ***\n"));

server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running!' });
});

server.post('/users', (req, res) => {
  const {username, password} = req.body;
  const user = new User({username: username, password: password});
  user.save()
    .then(user => res.status(201).json(user))
    .catch(err => res.status(500).json(err));
});

server.delete('/users/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then(response => res.json(response))
    .catch(err => res.status(500).json(err));
});

if (process.env.NODE_ENV !== 'test') {
  server.listen(9000);
}

module.exports = server;