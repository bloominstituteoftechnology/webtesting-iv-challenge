const express = require('express');
const mongoose = require('mongoose');
const User = require('./users/user')

const server = express();

mongoose.connect('mongodb://localhost/testingdb', {}, err => {
    if (err) return console.log(err);
    console.log('Connected to database!');
})
server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running!' });
});

server.post('/user', function post(req, res) {
    const userData = req.body;
    const user = new User(userData);
    user
      .save()
      .then(user => {
        res.status(201).json(user);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });
//   server.get('/api/users', function get(req, res) {
//     User.find().then(users => {
//       res.status(200).json(users);
//     });
//   });


if (process.env.NODE_ENV !== 'test') {
  server.listen(9000);
}

module.exports = server;
