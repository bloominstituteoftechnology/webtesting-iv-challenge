const express = require('express');
const server = express();
const userData = [];
let id = 0;

server.use(express.json());

server.post('/users', (req, res) => {
  const { name, title } = req.body;
  if (!name || name === '') {
    res.status(400).json({ error: 'You need a name.' });
  } else {
    userData.push({ id: id, name: name, title: title });
    id++;
    res.status(201).json({ name: name, title: title });
  }
});

server.delete('/user/:id', (req, res) => {
  const id = Number(req.params.id);
  let user = null;
  for (let i = 0; i < userData.length; i++) {
    if (userData[i].id === id) {
      user = userData[i];
      break;
    }
  }
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ error: 'User with this id not found' });
  }
  
});


module.exports = server;