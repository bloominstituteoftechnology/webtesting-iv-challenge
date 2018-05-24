const express = require('express');
const server = express();

const User = require('./Users/User');

server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

server.post('/register', (req, res) => {
  const user = req.body;
  
  User.create(user)
    .then(newUser => {
      //console.log(newUser);
      res.status(201).json({ newUser });
    })
    .catch(err => res.json(err));
});

server.delete('/delete/:user', (req, res) => {
  const {user} = req.params.user;
  
  User.remove({ username: user })
    .then(response => {
      res.json({ message: 'user deleted', response });
    })
    .catch(err => res.json(err));
});


if (process.env.NODE_ENV !== 'test') {
  server.listen(5000);
}


module.exports = server;